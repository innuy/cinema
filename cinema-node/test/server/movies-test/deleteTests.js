const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Movie = require("../../../db/models/movies");
const testingMovieIdToDelete = '5c2e105c8509f424122c4067';
const testingMovieWrongIdToDelete = '000000000000000000000001';
const testingMovieData = {
    name: "Toy Story",
    image: "image link",
    duration: "1h10m",
    actors: ["Buzz"],
    summary: "Great movie",
    director: "John Lasseter"
};

async function movieDeleteTestbyId(done) {
    await request(app)
        .del('/movies/' + testingMovieIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 204);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}

async function movieWrongIdDeleteTest(done) {
    await request(app)
        .del('/movies/' + testingMovieWrongIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 404);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Movie Delete by id test", async function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Movie.find.restore();
        Movie.findOneAndDelete.restore();
    });

    it('Successful - Delete movie', (done) => {
        sinon.stub(Movie, 'find').resolves([testingMovieData]);
        sinon.stub(Movie, 'findOneAndDelete').resolves();
        movieDeleteTestbyId(done);
    });
    it('Failed - Wrong id', (done) => {
        sinon.stub(Movie, 'find').resolves(null);
        sinon.stub(Movie, 'findOneAndDelete').resolves(null);
        movieWrongIdDeleteTest(done);
    });
});
