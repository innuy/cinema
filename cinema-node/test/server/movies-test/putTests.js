const sinon = require('sinon');
var chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const request = require('supertest');
let app;

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

async function moviePutTest() {
    await request(app)
        .put('/movies/' + testingMovieIdToSearch)
        .send(testingUpdateMovieData)
        .then(res => {
            res.body.should.be.an('object');
            res.status.should.equal(200);
        })
        .catch(err => {
            console.log(err);
        });
}

async function movieIncompletePutTest() {
    await request(app)
        .put('/movies/' + testingMovieIdToSearch)
        .send(testingIncompleteMovieData)
        .then(res => {
            res.body.should.be.an('object');
            res.status.should.equal(400);
        })
        .catch(err => {
            console.log(err);
        });
}

async function movieWrongIdPutTest() {
    await request(app)
        .put('/movies/' + testingMovieWrongIdToSearch)
        .send(testingUpdateMovieData)
        .then(res => {
            res.body.should.be.an('object');
            res.status.should.equal(404);
        })
        .catch(err => {
            console.log(err);
        });
}

async function movieWrongIdPutTest() {
    await request(app)
        .put('/movies/' + testingMovieWrongIdToSearch)
        .send(testingUpdateMovieData)
        .then(res => {
            res.body.should.be.an('object');
            res.status.should.equal(404);
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
        Movie.findOneAndUpdate.restore();
    });

    it('Successful - Update movie',() => {
        sinon.stub(Movie, 'findOneAndUpdate').resolves();
        moviePutTest;
    });
    it('Failed - Incomplete movie data',() => {
        sinon.stub(Movie, 'findOneAndUpdate').resolves();
        movieIncompletePutTest;
    });
    it('Failed - Wrong id',() => {
        sinon.stub(Movie, 'findOneAndUpdate').resolves(null);
        movieWrongIdPutTest;
    });
    it('Failed - Db id',() => {
        sinon.stub(Movie, 'findOneAndUpdate').throws();
        moviePutTest;
    });
});
