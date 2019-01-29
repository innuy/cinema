const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

const Tools = require("../../../routes/presentations/tools");
require('../setup');

const Presentation = require("../../../db/models/presentations");
const Movie = require("../../../db/models/movies");
const Auditorium = require("../../../db/models/auditoriums");


const presentationHandlers = require("../../../routes/presentations/handlers");


const testingMovieId = '5c3cca061b450f3ed1e2dfde';
const testingAuditoriumId = '5c34a1ce4150f31a815d41b4';
const testingWrongId = '5c34a1ce4150f31a815d41b0';

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

function presentationPostTest(done) {
    request(app)
        .post('/presentations')
        .send(testingPresentationData)
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 200);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function presentationEmptyPostTest(done) {
    request(app)
        .post('/presentations')
        .send()
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 400);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function presentationWrongInformationPostTest(done) {
    request(app)
        .post('/presentations')
        .send(testingPresentationDataWithWrongInformation)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 400);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function presentationWrongMovieIdPostTest(done) {
    request(app)
        .post('/presentations')
        .send(testingPresentationDataWithMovieWrongInformation)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 412);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function presentationWrongAuditoriumInformationPostTest(done) {
    request(app)
        .post('/presentations')
        .send(testingPresentationDataWithAuditoriumWrongInformation)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 412);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Presentation Post Test with incorrect Db info", function () {
    beforeEach(() => {
        sinon.stub(Tools, 'checkMovie').rejects(Error("movie not found"));
        app = require('../../../app');
    });
    afterEach(() => {
        Tools.checkMovie.restore();
    });
    it('Failed - Request with wrong movie id', (done) => {
        presentationWrongMovieIdPostTest(done);
    });
    it('Failed - Request with wrong auditorium id ', (done) => {
        sinon.stub(Movie, 'findOne').resolves(testingMovieData);
        sinon.stub(Auditorium, 'findOne').resolves({});
        presentationWrongAuditoriumInformationPostTest(done);
        Auditorium.findOne.restore();
        Movie.findOne.restore();
    });
});

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

