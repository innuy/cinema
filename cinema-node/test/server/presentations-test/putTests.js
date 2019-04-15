const sinon = require('sinon');
var chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const request = require('supertest');
let app;

const Tools = require("../../../routes/presentations/tools");
require('../setup');

const Presentation = require("../../../db/models/presentations");
const Movie = require("../../../db/models/movies");
const Auditorium = require("../../../db/models/auditoriums");

const errors = require("../../../routes/presentations/errors");

const date = new Date("August 25, 1825 12:00:00");

const testingMovieId = '5c2f723b62607929f4c347d3';
const testingAuditoriumId = '5c34a1ce4150f31a815d41b4';
const testingPresentationIdToSearch = '5c35fdd3f41e1b3ac370caf1';
const testingPresentationWrongIdToSearch = '000000000000000000000001';

const testingUpdatePresentationData = {
    movie: testingMovieId,
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
};
const testingIncompletePresentationData = {
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
};
const testingUpdatePresentationDataWithMovieWrongInformation = {
    movie: testingPresentationWrongIdToSearch,
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
};
const testingUpdatePresentationDataWithAuditoriumWrongInformation = {
    movie: testingMovieId,
    auditorium: testingPresentationWrongIdToSearch,
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

function presentationPutTest(done) {
    request(app.app)
        .put('/presentations/' + testingPresentationIdToSearch)
        .send(testingUpdatePresentationData)
        .then(res => {
            setTimeout(() => {
                res.body.should.be.an('object');
                res.status.should.equal(200);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function presentationIncompletePutTest(done) {
    request(app.app)
        .put('/presentations/' + testingPresentationIdToSearch)
        .send(testingIncompletePresentationData)
        .then(res => {
            setTimeout(() => {
                res.body.should.be.an('object');
                res.status.should.equal(400);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function presentationWrongIdPutTest(done) {
    request(app.app)
        .put('/presentations/' + testingPresentationWrongIdToSearch)
        .send(testingUpdatePresentationData)
        .then(res => {
            setTimeout(() => {
                res.body.should.be.an('object');
                res.status.should.equal(404);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function presentationWrongMovieIdPutTest(done) {
    request(app.app)
        .put('/presentations/' + testingPresentationIdToSearch)
        .send(testingUpdatePresentationDataWithMovieWrongInformation)
        .then(res => {
            setTimeout(() => {
                res.status.should.equal(412);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function presentationWrongAuditoriumInformationPutTest(done) {
    request(app.app)
        .put('/presentations/' + testingPresentationIdToSearch)
        .send(testingUpdatePresentationDataWithAuditoriumWrongInformation)
        .then(res => {
            setTimeout(() => {
                res.status.should.equal(412);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function presentationDbErrorPutTest(done) {
    request(app.app)
        .put('/presentations/' + testingPresentationIdToSearch)
        .send(testingUpdatePresentationData)
        .then(res => {
            setTimeout(() => {
                res.body.should.be.an('object');
                res.status.should.equal(500);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

describe("Presentation Post Test with incorrect Db info", function () {
    beforeEach(() => {
        sinon.stub(Tools, 'checkMovie').rejects(errors.movieNotFound);
        app = require('../../../app');
    });
    afterEach(() => {
        Tools.checkMovie.restore();
    });
    it('Failed - Request with wrong movie id', (done) => {
        presentationWrongMovieIdPutTest(done);
    });
    it('Failed - Request with wrong auditorium id ', (done) => {
        sinon.stub(Movie, 'findOne').resolves(testingMovieData);
        sinon.stub(Auditorium, 'findOne').resolves({});
        presentationWrongAuditoriumInformationPutTest(done);
        Auditorium.findOne.restore();
        Movie.findOne.restore();
    });
});

describe("Presentation Put Test", function () {
    beforeEach(() => {
        sinon.stub(Movie, 'findOne').resolves(testingMovieData);
        sinon.stub(Auditorium, 'findOne').resolves(testingAuditoriumData);
        app = require('../../../app');
    });

    afterEach(() => {
        Movie.findOne.restore();
        Auditorium.findOne.restore();
        Presentation.findByIdAndUpdate.restore();
    });

    it('Successful - Update presentation', (done) => {
        sinon.stub(Presentation, 'findByIdAndUpdate').resolves();
        presentationPutTest(done);
    });
    it('Failed - Incomplete presentation data', (done) => {
        sinon.stub(Presentation, 'findByIdAndUpdate').resolves();
        presentationIncompletePutTest(done);
    });
    it('Failed - Wrong id', (done) => {
        sinon.stub(Presentation, 'findByIdAndUpdate').resolves(null);
        presentationWrongIdPutTest(done);
    });
    it('Failed - Db error', (done) => {
        sinon.stub(Presentation, 'findByIdAndUpdate').rejects();
        presentationDbErrorPutTest(done);
    });
});
