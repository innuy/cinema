const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Auditoriums = require("../../../db/models/auditoriums");

const testingAuditoriumIdToSearch = '5c267aa85335a14c175cb0dd';

const testingAuditoriumWrongId = '000000000000000000000001';

const testingAuditoriumFilterData = {
    _id: testingAuditoriumIdToSearch,
    number: 2,
};

const testingAuditoriumWrongFilterData = {
    number: "one",
};

function getAuditoriumListWithFilters(done) {
    request(app)
        .get('/auditoriums?number=2')
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                res.body.should.be.an('array');
                assert.strictEqual(res.status, 200);
                res.body.forEach(auditorium => {
                    assert.strictEqual(auditorium.number, testingAuditoriumFilterData.number)
                });
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function getAuditoriumsListWithoutFilters(done) {
    request(app)
        .get('/auditoriums')
        .query()
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                res.body.should.be.an('array');
                assert.strictEqual(res.status, 200);
                res.body.forEach(auditorium => {
                    assert.strictEqual(auditorium.number, testingAuditoriumFilterData.number)
                });
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function getAuditoriumsListWithWrongFilters(done) {
    request(app)
        .get('/auditoriums')
        .query(testingAuditoriumWrongFilterData)
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 400);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function getAuditoriumsById(done) {
    request(app)
        .get('/auditoriums/' + testingAuditoriumIdToSearch)
        .query()
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 200);
                assert.strictEqual(res.body._id, testingAuditoriumIdToSearch);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function getAuditoriumsByIdWithWrongId(done) {
    request(app)
        .get('/auditoriums/' + testingAuditoriumWrongId)
        .query()
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 404);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

describe("Auditoriums Get Test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Auditoriums.find.restore();
    });

    it('Successful - Get list with filters', (done) => {
        sinon.stub(Auditoriums, 'find').resolves([testingAuditoriumFilterData]);
        getAuditoriumListWithFilters(done);
    });

    it('Successful - Get list without filters', (done) => {
        sinon.stub(Auditoriums, 'find').resolves([testingAuditoriumFilterData]);
        getAuditoriumsListWithoutFilters(done);
    });

    it('Failed - Wrong filters', (done) => {
        sinon.stub(Auditoriums, 'find').resolves(null);
        getAuditoriumsListWithWrongFilters(done);
    });
});

describe("Auditoriums Get by Id Test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Auditoriums.findById.restore();
    });

    it('Successful - Get one by id', (done) => {
        sinon.stub(Auditoriums, 'findById').resolves(testingAuditoriumFilterData);
        getAuditoriumsById(done);
    });

    it('Failed - Get one with wrong id', (done) => {
        sinon.stub(Auditoriums, 'findById').resolves(null);
        getAuditoriumsByIdWithWrongId(done);
    });
});