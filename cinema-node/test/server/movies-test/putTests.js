const sinon = require('sinon');
var chai = require('chai');
chai.use(require('chai-string'));
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const request = require('supertest');
let app;

const Movie = require("../../../db/models/movies");

const testingMovieIdToSearch = '5c267aa85335a14c175cb0dd';

const testingMovieData = {
    id: testingMovieIdToSearch,
    name: "Toy Story",
    image: "image link",
    duration: "1h10m",
    actors: "Buzz",
    summary: "Great movie"
};

const testingUpdateMovieData = {
    _id: testingMovieIdToSearch,
    name: "Toy Story",
    image: "image link",
    duration: "2h10m",
    actors: ["Buzz", "Woody", "Andy"],
    summary: "Best movie ever!!!"
};


async function moviePutTest() {
    await request(app)
        .put('/movies/' + testingMovieIdToSearch)
        .send(testingUpdateMovieData)
        .then(res => {
            res.body.should.be.an('object');
            res.status.should.not.equal(404);
            assert.equal(res.body.name, testingUpdateMovieData.name);
            assert.equal(res.body.id, testingUpdateMovieData.id);
            assert.equal(res.body.duration, testingUpdateMovieData.duration);
            assert.deepEqual(res.body.actors, testingUpdateMovieData.actors);
            assert.equal(res.body.summary, testingUpdateMovieData.summary);
        })
        .catch(err => {
            console.log(err);
        });
}


describe("Movie Put Test", function () {
    beforeEach(() => {
        sinon.stub(Movie, 'findOneAndUpdate').resolves(testingUpdateMovieData);
        app = require('../../../app');
    });

    afterEach(() => {
        Movie.findOneAndUpdate.restore();
    });

    it('Movie Successful Put', moviePutTest);
});
