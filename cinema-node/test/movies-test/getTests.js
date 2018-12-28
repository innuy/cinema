const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

const Movie = require("../../db/models/movies");

const testingMovieData = {
    name: "Toy Story",
    image: "image link",
    duration: "1h10m",
    actors: "Buzz",
    summary: "Great movie"
};

var testingMovieIdToSearch='5c267aa85335a14c175cb0dd';

async function movieGetTest() {
    await request(app)
        .get('/movies')
        .send(testingMovieData)
        .then(res => {
            res.should.be.an('object');
            res.body.should.be.an('array');
            res.body.should.be//not empty array
            console.log('body');
            console.log(res.body);
            console.log('name');
            console.log(res.body[0].name);

            assert.strictEqual(res.status, 200);
            res.body.forEach( movie => {
                assert.strictEqual(movie.name, testingMovieData.name)
            });

        })
        .catch(err => {
            console.log(err);
        })
}

async function movieGetTestbyId() {
    await request(app)
        .get('/movies/'+testingMovieIdToSearch)
        .send(testingMovieData)
        .then(res => {
            res.should.be.an('object');

            console.log('Movie id requested');
            console.log(testingMovieIdToSearch);
            console.log('Movie id received');
            console.log(res.body[0]._id);

            assert.strictEqual(res.status, 200);
            res.body.forEach( movie => {
                assert.strictEqual(movie._id, testingMovieIdToSearch)
            });

        })
        .catch(err => {
            console.log(err);
        })
}

describe("Mongo-Mongoose connection test", function() {
    beforeEach(() => {
        // sinon.stub(Movie, 'create').resolves(testingMovieData);
        app = require('../../app');
    });

    afterEach(() => {
        // Movie.create.restore();
    });

    it('Movie Successful Get', movieGetTest);
    it('Movie Successful Get  by Id', movieGetTestbyId);
});
