const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

const Presentation = require("../../../db/models/presentations");
const Movie = require("../../../db/models/movies");
const Auditorium = require("../../../db/models/auditoriums");

const testingMovieId = '5c2f723b62607929f4c347d3';
const testingAuditoriumId = '5c34a1ce4150f31a815d41b4';
const testingWrongId = '000000000000000000000001';

const date = new Date("August 25, 1825 12:00:00");

const testingPresentationData = {
    movie: testingMovieId,
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
};
const testingPresentationDataWithWrongInformation = {
    movie: 'Toy Story',
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
};
const testingPresentationDataWithMovieWrongInformation = {
    movie: testingWrongId,
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
};
const testingPresentationDataWithAuditoriumWrongInformation = {
    movie: testingMovieId,
    auditorium: testingWrongId,
    start: date.toISOString(),
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

const testingMovieData = {
    _id: testingMovieId,
    name: "Toy Story",
    image: "image link",
    duration: "1h10m",
    actors: ["Buzz"],
    summary: "Great movie",
    director: "John Lasseter"
};


const testingAuditoriumData = {
    _id: testingAuditoriumId,
    number: 2,
    seatRows: 20,
    seatColumns: 10,
};

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

async function presentationWrongInformationPostTest() {
    await request(app)
        .post('/presentations')
        .send(testingPresentationDataWithWrongInformation)
        .then(res => {
            assert.strictEqual(res.status, 400);
        })
        .catch(err => {
            console.log(err);
        })
}

async function presentationWrongMovieIdPostTest() {
    await request(app)
        .post('/presentations')
        .send(testingPresentationDataWithMovieWrongInformation)
        .then(res => {
            assert.strictEqual(res.status, 412);
        })
        .catch(err => {
            console.log(err);
        })
}

async function presentationWrongAuditoriumInformationPostTest() {
    await request(app)
        .post('/presentations')
        .send(testingPresentationDataWithAuditoriumWrongInformation)
        .then(res => {
            assert.strictEqual(res.status, 412);
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Presentation Post Test", function () {
    beforeEach(() => {
        sinon.stub(Movie, 'findOne').resolves(testingMovieData);
        sinon.stub(Auditorium, 'findOne').resolves(testingAuditoriumData);
        sinon.stub(Presentation, 'create').resolves(testingPresentationData);
        sinon
            .stub(Presentation.prototype, 'save')
            .resolves(() => testingPresentationData);
        app = require('../../../app');
    });

    afterEach(() => {
        Movie.findOne.restore();
        Auditorium.findOne.restore();
        Presentation.create.restore();
        Presentation.prototype.save.restore();
    });

    it('Successful - Create presentation', presentationPostTest);
    it('Failed - Empty request', presentationEmptyPostTest);
    it('Failed - Request with wrong name ', presentationWrongInformationPostTest);
});

describe("Presentation Post Test with incorrect Db info", function () {

    it('Failed - Request with wrong movie id ', () =>{
        sinon.stub(Movie, 'findOne').resolves(null);
        presentationWrongMovieIdPostTest;
        Movie.findOne.restore();
    });
    it('Failed - Request with wrong auditorium id ', () =>{
        sinon.stub(Movie, 'findOne').resolves(testingMovieData);
        sinon.stub(Auditorium, 'findOne').resolves(null);
        presentationWrongAuditoriumInformationPostTest;
        Movie.findOne.restore();
        Auditorium.findOne.restore();
    });
});
