const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

const Movie = require("../../../db/models/movies");

const testingMovieIdToDelete = '5c2e105c8509f424122c4067';

const movieGetTest = require('./getTests');

const testingMovieData = {
    name: "Toy Story",
    image: "image link",
    duration: "1h10m",
    actors: "Buzz",
    summary: "Great movie"
};

async function movieDeleteTestbyId() {
    await request(app)
        .del('/movies/' + testingMovieIdToDelete)
        .send()
        .then((res,resolve) => {
            setTimeout(()=>{
                res.should.be.an('object');
                assert.equal(res.status, 204);
            });
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Movie Delete Test", async function() {
    beforeEach(() => {
        app = require('../../../app');
        sinon.stub(Movie, 'find').resolves([testingMovieData]);
        sinon.stub(Movie, 'findOneAndDelete').resolves();
    });

    afterEach(() => {
        Movie.find.restore();
        Movie.findOneAndDelete.restore();
    });

    it('Movie Successful Delete by Id', movieDeleteTestbyId);
});
