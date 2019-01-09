const sinon = require('sinon');
var chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const request = require('supertest');
let app;

const Presentation = require("../../../db/models/presentations");
const Movie = require("../../../db/models/movies");
const Auditorium = require("../../../db/models/auditoriums");

const date = new Date("August 25, 1825 12:00:00");

const testingMovieId = '5c2f723b62607929f4c347d3';
const testingAuditoriumId = '5c34a1ce4150f31a815d41b4';
const testingPresentationIdToSearch = '5c35fdd3f41e1b3ac370caf1';
const testingPresentationWrongIdToSearch = '000000000000000000000001';

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
const testingUpdatePresentationDataWithMovieWrongInformation = {
    movie: testingPresentationWrongIdToSearch,
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
    soldTickets: 0,
};
const testingUpdatePresentationDataWithAuditoriumWrongInformation = {
    movie: testingMovieId,
    auditorium: testingPresentationWrongIdToSearch,
    start: date.toISOString(),
    soldTickets: 0,
};

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

async function presentationWrongMovieIdPutTest() {
    await request(app)
        .put('/presentations/' + testingPresentationIdToSearch)
        .send(testingUpdatePresentationDataWithMovieWrongInformation)
        .then(res => {
            assert.strictEqual(res.status, 412);
        })
        .catch(err => {
            console.log(err);
        })
}

async function presentationWrongAuditoriumInformationPutTest() {
    await request(app)
        .put('/presentations/' + testingPresentationIdToSearch)
        .send(testingUpdatePresentationDataWithAuditoriumWrongInformation)
        .then(res => {
            assert.strictEqual(res.status, 412);
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Presentation Put Test", function () {
    beforeEach(() => {
        sinon.stub(Movie, 'findOne').resolves(testingMovieData);
        sinon.stub(Auditorium, 'findOne').resolves(testingAuditoriumData);
        app = require('../../../app');
    });

    afterEach(() => {
        Movie.findOne.restore();
        Auditorium.findOne.restore();
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

describe("Presentation Put Test with incorrect Db info", function () {

    it('Failed - Request with wrong movie id ', () =>{
        sinon.stub(Movie, 'findOne').resolves(null);
        presentationWrongMovieIdPutTest;
        Movie.findOne.restore();
    });
    it('Failed - Request with wrong auditorium id ', () =>{
        sinon.stub(Movie, 'findOne').resolves(testingMovieData);
        sinon.stub(Auditorium, 'findOne').resolves(null);
        presentationWrongAuditoriumInformationPutTest;
        Movie.findOne.restore();
        Auditorium.findOne.restore();
    });
});
