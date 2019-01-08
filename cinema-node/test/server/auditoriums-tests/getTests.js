const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

const Auditoriums = require("../../../db/models/auditoriums");

const testingAuditoriumFilterData = {
    number: 2,
    seatRows: 20,
    seatColumns: 10,
};

const testingAuditoriumWrongFilterData = {
    number: "one",
};

const testingAuditoriumIdToSearch = '5c267aa85335a14c175cb0dd';

const testingAuditoriumWrongId = '000000000000000000000001';

async function getAuditoriumListWithFilters() {
    await request(app)
        .get('/auditoriums')
        .query(testingAuditoriumFilterData)
        .then(res => {
            res.should.be.an('object');
            res.body.should.be.an('array');
            assert.strictEqual(res.status, 200);
            res.body.forEach(auditorium => {
                assert.strictEqual(auditorium.number, testingAuditoriumFilterData.number)
            });

        })
        .catch(err => {
            console.log(err);
        })
}

async function getAuditoriumsListWithoutFilters() {
    await request(app)
        .get('/auditoriums')
        .query()
        .then(res => {
            res.should.be.an('object');
            res.body.should.be.an('array');
            assert.strictEqual(res.status, 200);
            res.body.forEach(auditorium => {
                assert.strictEqual(auditorium.number, testingAuditoriumFilterData.number)
            });

        })
        .catch(err => {
            console.log(err);
        })
}

async function getAuditoriumsListWithWrongFilters() {
    await request(app)
        .get('/auditoriums')
        .query(testingAuditoriumWrongFilterData)
        .then(res => {
            res.should.be.an('object');
            res.body.should.be.an('array');
            assert.strictEqual(res.status, 200);
            res.body.forEach(auditorium => {
                assert.strictEqual(auditorium.number, testingAuditoriumFilterData.number)
            });

        })
        .catch(err => {
            console.log(err);
        })
}

async function getAuditoriumsById() {
    await request(app)
        .get('/auditoriums/' + testingAuditoriumIdToSearch)
        .query()
        .then(res => {
            res.should.be.an('object');
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body._id, testingAuditoriumIdToSearch)

        })
        .catch(err => {
            console.log(err);
        })
}

async function getAuditoriumsWithWrongId() {
    await request(app)
        .get('/auditoriums/' + testingAuditoriumWrongId)
        .query()
        .then(res => {
            res.should.be.an('object');
            assert.strictEqual(res.status, 404);
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Auditoriums Get Test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Auditoriums.find.restore();
    });

    it('Successful - Get list with filters', () => {
        sinon.stub(Auditoriums, 'find').resolves([testingAuditoriumFilterData]);
        getAuditoriumListWithFilters;
    });

    it('Successful - Get list without filters', () => {
        sinon.stub(Auditoriums, 'find').resolves([testingAuditoriumFilterData]);
        getAuditoriumsListWithoutFilters;
    });

    it('Failed - Wrong filters', () => {
        sinon.stub(Auditoriums, 'find').resolves(null);
        getAuditoriumsListWithWrongFilters;
    });

    it('Successful - Get one by id', () => {
        sinon.stub(Auditoriums, 'find').resolves(testingAuditoriumFilterData);
        getAuditoriumsById;
    });

    it('Failed - Wrong id', () => {
        sinon.stub(Auditoriums, 'find').resolves(null);
        getAuditoriumsWithWrongId;
    });
});
