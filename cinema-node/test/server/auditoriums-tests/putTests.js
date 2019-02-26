const sinon = require('sinon');
var chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const request = require('supertest');
let app;

require('../setup');

const Auditorium = require("../../../db/models/auditoriums");
const Seat = require("../../../db/models/seats");

const testingAuditoriumIdToSearch = '5c2d020e4b4dee53e9fd3f9b';
const testingAuditoriumWrongIdToSearch = '000000000000000000000001';

const testingUpdateAuditoriumData = {
    number: 2,
    seatRows: 20,
    seatColumns: 10,
};

const testingIncompleteAuditoriumData = {
    number: 12345,
    seatRows: 20,
};

function auditoriumPutTest(done) {
    request(app.app)
        .put('/auditoriums/' + testingAuditoriumIdToSearch)
        .send(testingUpdateAuditoriumData)
        .then(res => {
            setTimeout(() => {
            res.body.should.be.an('object');
            res.status.should.equal(200);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function auditoriumIncompletePutTest(done) {
    request(app.app)
        .put('/auditoriums/' + testingAuditoriumIdToSearch)
        .send(testingIncompleteAuditoriumData)
        .then(res => {
            setTimeout(() => {
            res.body.should.be.an('object');
            res.status.should.equal(400);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function auditoriumWrongIdPutTest(done) {
    request(app.app)
        .put('/auditoriums/' + testingAuditoriumWrongIdToSearch)
        .send(testingUpdateAuditoriumData)
        .then(res => {
            setTimeout(() => {
            res.body.should.be.an('object');
            res.status.should.equal(404);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function auditoriumDbErrorPutTest(done) {
    request(app.app)
        .put('/auditoriums/' + testingAuditoriumIdToSearch)
        .send(testingUpdateAuditoriumData)
        .then(res => {
            setTimeout(() => {
                res.body.should.be.an('object');
                res.status.should.equal(500);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

describe("Auditorium Put Test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Auditorium.findByIdAndUpdate.restore();
        Auditorium.findOne.restore();
        Seat.deleteMany.restore();
    });

    it('Successful - Update auditorium',(done) => {
        sinon.stub(Auditorium, 'findOne').resolves(testingUpdateAuditoriumData);
        sinon.stub(Auditorium, 'findByIdAndUpdate').resolves(testingUpdateAuditoriumData);
        sinon.stub(Seat, 'deleteMany').resolves();
        auditoriumPutTest(done);
    });
    it('Failed - Incomplete auditorium data',(done) => {
        sinon.stub(Auditorium, 'findOne').resolves();
        sinon.stub(Auditorium, 'findByIdAndUpdate').resolves();
        sinon.stub(Seat, 'deleteMany').resolves();
        auditoriumIncompletePutTest(done);
    });
    it('Failed - Wrong id',(done) => {
        sinon.stub(Auditorium, 'findOne').resolves(null);
        sinon.stub(Auditorium, 'findByIdAndUpdate').resolves();
        sinon.stub(Seat, 'deleteMany').resolves();
        auditoriumWrongIdPutTest(done);
    });
    it('Failed - Db error',(done) => {
        sinon.stub(Auditorium, 'findOne').rejects();
        sinon.stub(Auditorium, 'findByIdAndUpdate').resolves();
        sinon.stub(Seat, 'deleteMany').resolves();
        auditoriumDbErrorPutTest(done);
    });
});
