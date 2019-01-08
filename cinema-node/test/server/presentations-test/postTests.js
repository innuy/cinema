const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

const Presentation = require("../../../db/models/presentations");

const testingMovieId = '5c2f723b62607929f4c347d3';
const testingAuditoriumId = '5c34a1ce4150f31a815d41b4';
const date = new Date("August 25, 1825 12:00:00");

const testingPresentationData = {
    movie: testingMovieId,
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
    soldTickets: 0,
};

const testingPresentationDataWithWrongMovieInformation = {
    movie: 'Toy Story',
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
    soldTickets: 0,
};

async function presentationPostTest() {
    await request(app)
        .post('/presentations')
        .send(testingPresentationData)
        .then(res => {
            res.should.be.an('object');
            assert.strictEqual(res.status, 200);
        })
        .catch(err => {
            console.log(err);
        })
}

async function presentationEmptyPostTest() {
    await request(app)
        .post('/presentations')
        .send()
        .then(res => {
            assert.strictEqual(res.status, 400);
        })
        .catch(err => {
            console.log(err);
        })
}

async function presentationWrongMovieInformationPostTest() {
    await request(app)
        .post('/presentations')
        .send(testingPresentationDataWithWrongMovieInformation)
        .then(res => {
            assert.strictEqual(res.status, 400);
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Presentation Post Test", function () {
    beforeEach(() => {
        sinon.stub(Presentation, 'create').resolves(testingPresentationData);
        sinon
            .stub(Presentation.prototype, 'save')
            .resolves(() => testingPresentationData);
        app = require('../../../app');
    });

    afterEach(() => {
        Presentation.create.restore();
        Presentation.prototype.save.restore();
    });

    it('Successful - Create presentation', presentationPostTest);
    it('Failed - Empty request', presentationEmptyPostTest);
    it('Failed - Request with wrong name ', presentationWrongMovieInformationPostTest);
});
