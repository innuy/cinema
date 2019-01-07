const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

const Movie = require("../../../db/models/movies");

const testingMovieFilterData = {
    name: "Toy Story",
};

const testingMovieWrongFilterData = {
    name: 1,
};

const testingMovieIdToSearch = '5c267aa85335a14c175cb0dd';

const testingMovieWrongId = '000000000000000000000001';

async function getMovieListWithFilters() {
    await request(app)
        .get('/movies')
        .query(testingMovieFilterData)
        .then(res => {
            res.should.be.an('object');
            res.body.should.be.an('array');
            assert.strictEqual(res.status, 200);
            res.body.forEach(movie => {
                assert.strictEqual(movie.name, testingMovieFilterData.name)
            });

        })
        .catch(err => {
            console.log(err);
        })
}

async function getMovieListWithoutFilters() {
    await request(app)
        .get('/movies')
        .query()
        .then(res => {
            res.should.be.an('object');
            res.body.should.be.an('array');
            assert.strictEqual(res.status, 200);
            res.body.forEach(movie => {
                assert.strictEqual(movie.name, testingMovieFilterData.name)
            });

        })
        .catch(err => {
            console.log(err);
        })
}

async function getMovieListWithWrongFilters() {
    await request(app)
        .get('/movies')
        .query(testingMovieWrongFilterData)
        .then(res => {
            res.should.be.an('object');
            res.body.should.be.an('array');
            assert.strictEqual(res.status, 200);
            res.body.forEach(movie => {
                assert.strictEqual(movie.name, testingMovieFilterData.name)
            });

        })
        .catch(err => {
            console.log(err);
        })
}

async function getMovieById() {
    await request(app)
        .get('/movies/' + testingMovieIdToSearch)
        .query()
        .then(res => {
            res.should.be.an('object');
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body._id, testingMovieIdToSearch)

        })
        .catch(err => {
            console.log(err);
        })
}

async function getMovieWithWrongId() {
    await request(app)
        .get('/movies/' + testingMovieWrongId)
        .query()
        .then(res => {
            res.should.be.an('object');
            assert.strictEqual(res.status, 404);
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Movie Get Test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Movie.find.restore();
    });

    it('Successful - Get list with filters', () => {
        sinon.stub(Movie, 'find').resolves([testingMovieFilterData]);
        getMovieListWithFilters;
    });

    it('Successful - Get list without filters', () => {
        sinon.stub(Movie, 'find').resolves([testingMovieFilterData]);
        getMovieListWithoutFilters;
    });

    it('Failed - Wrong filters', () => {
        sinon.stub(Movie, 'find').resolves(null);
        getMovieListWithWrongFilters;
    });

    it('Successful - Get one by id', () => {
        sinon.stub(Movie, 'find').resolves(testingMovieFilterData);
        getMovieById;
    });

    it('Failed - Wrong id', () => {
        sinon.stub(Movie, 'find').resolves(null);
        getMovieWithWrongId;
    });
});
