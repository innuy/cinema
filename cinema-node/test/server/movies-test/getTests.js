const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Movie = require("../../../db/models/movies");

const testingMovieIdToSearch = '5c267aa85335a14c175cb0dd';

const testingMovieWrongId = '100000000000000000000001';

const testingMovieFilterData = {
    name: "Toy Story",
};

const testingMovieWrongFilterData = {
    number: "Toy Story",
};

function getMovieListWithFilters(done) {
    request(app)
        .get('/movies')
        .query(testingMovieFilterData)
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                res.body.should.be.an('array');
                assert.strictEqual(res.status, 200);
                res.body.forEach(movie => {
                    assert.strictEqual(movie.name, testingMovieFilterData.name)
                });
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}

function getMovieListWithoutFilters(done) {
    request(app)
        .get('/movies')
        .query()
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                res.body.should.be.an('array');
                assert.strictEqual(res.status, 200);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}

function getMovieListWithWrongFilters(done) {
    request(app)
        .get('/movies')
        .query(testingMovieWrongFilterData)
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 400);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function getMovieById(done) {
    request(app)
        .get('/movies/' + testingMovieIdToSearch)
        .query()
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 200);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}

function getMovieWithWrongId(done) {
    request(app)
        .get('/movies/' + testingMovieWrongId)
        .query()
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 404);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

describe("Movie Get Test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Movie.find.restore();
    });

    it('Successful - Get list with filters', (done) => {
        sinon.stub(Movie, 'find').resolves([testingMovieFilterData]);
        getMovieListWithFilters(done);
    });

    it('Successful - Get list without filters', (done) => {
        sinon.stub(Movie, 'find').resolves([testingMovieFilterData, testingMovieFilterData]);
        getMovieListWithoutFilters(done);
    });

    it('Failed - Wrong filters', (done) => {
        sinon.stub(Movie, 'find').rejects();
        getMovieListWithWrongFilters(done);
    });

    it('Successful - Get one by id', (done) => {
        sinon.stub(Movie, 'find').resolves(testingMovieFilterData);
        getMovieById(done);
    });

    it('Failed - Wrong id', (done) => {
        sinon.stub(Movie, 'find').resolves(null);
        getMovieWithWrongId(done);
    });
});
