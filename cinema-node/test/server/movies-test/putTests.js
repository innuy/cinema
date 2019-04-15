const sinon = require('sinon');
var chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const request = require('supertest');
let app;

require('../setup');

const Movie = require("../../../db/models/movies");

const testingMovieIdToSearch = '5c2d020e4b4dee53e9fd3f9b';
const testingMovieWrongIdToSearch = '000000000000000000000001';

const testingUpdateMovieData = {
    name: "Toy Story",
    image: "image link",
    duration: "4h10m",
    director: "John Lasseter",
    actors: ["Buzz", "Woody", "Andy"],
    summary: "Best movie ever!!!"
};

const testingIncompleteMovieData = {
    image: "image link",
    duration: "1h10m",
    actors: "Buzz",
    summary: "Great movie",
    director: "John Lasseter"
};

function moviePutTest(done) {
    request(app.app)
        .put('/movies/' + testingMovieIdToSearch)
        .send(testingUpdateMovieData)
        .then(res => {
            setTimeout(() => {
                res.body.should.be.an('object');
                res.status.should.equal(200);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function movieIncompletePutTest(done) {
    request(app.app)
        .put('/movies/' + testingMovieIdToSearch)
        .send(testingIncompleteMovieData)
        .then(res => {
            setTimeout(() => {
                res.body.should.be.an('object');
                res.status.should.equal(400);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function movieWrongIdPutTest(done) {
    request(app.app)
        .put('/movies/' + testingMovieWrongIdToSearch)
        .send(testingUpdateMovieData)
        .then(res => {
            setTimeout(() => {
                res.body.should.be.an('object');
                res.status.should.equal(404);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function movieDbErrorPutTest(done) {
    request(app.app)
        .put('/movies/' + testingMovieIdToSearch)
        .send(testingUpdateMovieData)
        .then(res => {
            setTimeout(() => {
                res.status.should.equal(500);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}


describe("Movie Put Test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Movie.findByIdAndUpdate.restore();
    });

    it('Successful - Update movie', (done) => {
        sinon.stub(Movie, 'findByIdAndUpdate').resolves(testingUpdateMovieData);
        moviePutTest(done);
    });
    it('Failed - Incomplete movie data', (done) => {
        sinon.stub(Movie, 'findByIdAndUpdate').resolves(testingUpdateMovieData);
        movieIncompletePutTest(done);
    });
    it('Failed - Wrong id', (done) => {
        sinon.stub(Movie, 'findByIdAndUpdate').resolves(null);
        movieWrongIdPutTest(done);
    });
    it('Failed - Db id', (done) => {
        sinon.stub(Movie, 'findByIdAndUpdate').rejects();
        movieDbErrorPutTest(done);
    });
});
