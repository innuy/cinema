const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

const Presentations = require("../../../db/models/presentations");

const testingMovieId = '5c2f723b62607929f4c347d3';
const testingAuditoriumId = '5c34a1ce4150f31a815d41b4';
const date = new Date("August 25, 1825 12:00:00");

const testingPresentationFilterData = {
    movie: testingMovieId,
};
const testingPresentationAnswerData = {
    movie: testingMovieId,
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
    soldTickets: 0,
};
const testingPresentationWrongFilterData = {
    movie: 'Toy Story',
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
    soldTickets: 0,
};

const testingPresentationIdToSearch = '5c267aa85335a14c175cb0dd';

const testingPresentationWrongId = '000000000000000000000001';

async function getPresentationListWithFilters() {
    await request(app)
        .get('/presentations')
        .query(testingPresentationFilterData)
        .then(res => {
            res.should.be.an('object');
            res.body.should.be.an('array');
            assert.strictEqual(res.status, 200);
            res.body.forEach(presentation => {
                assert.strictEqual(presentation.movie, testingPresentationFilterData.movie)
            });
        })
        .catch(err => {
            console.log(err);
        })
}

async function getPresentationsListWithoutFilters() {
    await request(app)
        .get('/presentations')
        .then(res => {
            res.should.be.an('object');
            res.body.should.be.an('array');
            assert.strictEqual(res.status, 200);
            res.body.forEach(presentation => {
                assert.strictEqual(presentation.movie, testingPresentationFilterData.movie)
            });

        })
        .catch(err => {
            console.log(err);
        })
}

async function getPresentationsListWithWrongFilters() {
    await request(app)
        .get('/presentations')
        .query(testingPresentationWrongFilterData)
        .then(res => {
            res.should.be.an('object');
            res.body.should.be.an('array');
            assert.strictEqual(res.status, 200);
            res.body.forEach(presentation => {
                assert.strictEqual(presentation.movie, testingPresentationFilterData.movie)
            });

        })
        .catch(err => {
            console.log(err);
        })
}

async function getPresentationsById() {
    await request(app)
        .get('/presentations/' + testingPresentationIdToSearch)
        .query()
        .then(res => {
            res.should.be.an('object');
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body._id, testingPresentationIdToSearch)

        })
        .catch(err => {
            console.log(err);
        })
}

async function getPresentationsWithWrongId() {
    await request(app)
        .get('/presentations/' + testingPresentationWrongId)
        .query()
        .then(res => {
            res.should.be.an('object');
            assert.strictEqual(res.status, 404);
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Presentations Get Test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Presentations.find.restore();
    });

    it('Successful - Get list with filters', () => {
        sinon.stub(Presentations, 'find').resolves([testingPresentationAnswerData]);
        getPresentationListWithFilters;
    });

    it('Successful - Get list without filters', () => {
        sinon.stub(Presentations, 'find').resolves([testingPresentationAnswerData]);
        getPresentationsListWithoutFilters;
    });

    it('Failed - Wrong filters', () => {
        sinon.stub(Presentations, 'find').resolves(null);
        getPresentationsListWithWrongFilters;
    });

    it('Successful - Get one by id', () => {
        sinon.stub(Presentations, 'find').resolves(testingPresentationAnswerData);
        getPresentationsById;
    });

    it('Failed - Wrong id', () => {
        sinon.stub(Presentations, 'find').resolves(null);
        getPresentationsWithWrongId;
    });
});
