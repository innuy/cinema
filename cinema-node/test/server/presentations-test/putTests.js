const sinon = require('sinon');
var chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const request = require('supertest');
let app;

const Presentation = require("../../../db/models/presentations");

const testingPresentationIdToSearch = '5c2f723b62607929f4c347d3';
const testingPresentationWrongIdToSearch = '000000000000000000000001';
const date = new Date("August 25, 1825 12:00:00");
const testingMovieId = '5c2d020e4b4dee53e9fd3f9b';
const testingAuditoriumId = '5c2d020e4b4dee53e9fd3f9b';


const testingUpdatePresentationData = {
    movie: testingMovieId,
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
    soldTickets: 0,
};

const testingIncompletePresentationData = {
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
    soldTickets: 0,
};

async function presentationPutTest() {
    await request(app)
        .put('/presentations/' + testingPresentationIdToSearch)
        .send(testingUpdatePresentationData)
        .then(res => {
            res.body.should.be.an('object');
            res.status.should.equal(200);
        })
        .catch(err => {
            console.log(err);
        });
}

async function presentationIncompletePutTest() {
    await request(app)
        .put('/presentations/' + testingPresentationIdToSearch)
        .send(testingIncompletePresentationData)
        .then(res => {
            res.body.should.be.an('object');
            res.status.should.equal(400);
        })
        .catch(err => {
            console.log(err);
        });
}

async function presentationWrongIdPutTest() {
    await request(app)
        .put('/presentations/' + testingPresentationWrongIdToSearch)
        .send(testingUpdatePresentationData)
        .then(res => {
            res.body.should.be.an('object');
            res.status.should.equal(404);
        })
        .catch(err => {
            console.log(err);
        });
}

describe("Presentation Put Test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Presentation.findOneAndUpdate.restore();
    });

    it('Successful - Update presentation',() => {
        sinon.stub(Presentation, 'findOneAndUpdate').resolves();
        presentationPutTest;
    });
    it('Failed - Incomplete presentation data',() => {
        sinon.stub(Presentation, 'findOneAndUpdate').resolves();
        presentationIncompletePutTest;
    });
    it('Failed - Wrong id',() => {
        sinon.stub(Presentation, 'findOneAndUpdate').resolves(null);
        presentationWrongIdPutTest;
    });
    it('Failed - Db id',() => {
        sinon.stub(Presentation, 'findOneAndUpdate').throws();
        presentationPutTest;
    });
});
