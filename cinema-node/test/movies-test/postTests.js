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

async function moviePostTest() {
    await request(app)
        .post('/movies')
        .send(testingMovieData)
        .then(res => {
            console.log("Succesfuly created " + testingMovieData.name);
            console.log(res.text);
            res.should.be.an('object');
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.text, "Succesfuly created " + testingMovieData.name);
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Movie Post Test", function() {
    beforeEach(() => {
        sinon.stub(Movie, 'create').resolves(testingMovieData);
        app = require('../../app');
    });

    afterEach(() => {
        Movie.create.restore();
    });

    it('Movie Successful Post', moviePostTest);
});
