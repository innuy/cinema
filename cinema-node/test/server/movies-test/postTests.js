const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Movie = require("../../../db/models/movies");

const testingMovieData2 = {
    name: "Toy Story",
    image: "image link",
    duration: "1h10m",
    actors: ["Buzz"],
    summary: "Great movie",
    director: "John Lasseter"
};

const testingMovieData = {
    name: "Hercules",
    image: "image link",
    duration: "1h20m",
    actors: ["Hercules", "Megara", "Zeus"],
    summary: "Awesome movie",
    director: "Brett Ratner"
};

function moviePostTest(done) {
    request(app)
        .post('/movies')
        .send(testingMovieData)
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 200);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function movieEmptyPostTest(done) {
    request(app)
        .post('/movies')
        .send()
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 400);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function movieWrongNamePostTest(done) {
    request(app)
        .post('/movies')
        .send({name: 1})
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 400);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

describe("Movie Post Test", function () {
    beforeEach(() => {
        sinon.stub(Movie, 'create').resolves(testingMovieData);
        sinon
            .stub(Movie.prototype, 'save')
            .resolves(() => testingMovieData);
        app = require('../../../app');
    });

    afterEach(() => {
        Movie.create.restore();
        Movie.prototype.save.restore();
    });

    it('Successful - Create movie', moviePostTest);
    it('Failed - Empty request', movieEmptyPostTest);
    it('Failed - Request with wrong name ', movieWrongNamePostTest);
});
