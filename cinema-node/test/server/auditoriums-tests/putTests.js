const sinon = require('sinon');
var chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const request = require('supertest');
let app;

const Auditorium = require("../../../db/models/auditoriums");

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

async function auditoriumPutTest() {
    await request(app)
        .put('/auditoriums/' + testingAuditoriumIdToSearch)
        .send(testingUpdateAuditoriumData)
        .then(res => {
            res.body.should.be.an('object');
            res.status.should.equal(200);
        })
        .catch(err => {
            console.log(err);
        });
}

async function auditoriumIncompletePutTest() {
    await request(app)
        .put('/auditoriums/' + testingAuditoriumIdToSearch)
        .send(testingIncompleteAuditoriumData)
        .then(res => {
            res.body.should.be.an('object');
            res.status.should.equal(400);
        })
        .catch(err => {
            console.log(err);
        });
}

async function auditoriumWrongIdPutTest() {
    await request(app)
        .put('/auditoriums/' + testingAuditoriumWrongIdToSearch)
        .send(testingUpdateAuditoriumData)
        .then(res => {
            res.body.should.be.an('object');
            res.status.should.equal(404);
        })
        .catch(err => {
            console.log(err);
        });
}

async function auditoriumWrongIdPutTest() {
    await request(app)
        .put('/auditoriums/' + testingAuditoriumWrongIdToSearch)
        .send(testingUpdateAuditoriumData)
        .then(res => {
            res.body.should.be.an('object');
            res.status.should.equal(404);
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
        Auditorium.findOneAndUpdate.restore();
        Auditorium.findOne.restore();
    });

    it('Successful - Update auditorium',() => {
        sinon.stub(Auditorium, 'findOne').resolves();
        sinon.stub(Auditorium, 'findOneAndUpdate').resolves();
        auditoriumPutTest;
    });
    it('Failed - Incomplete auditorium data',() => {
        sinon.stub(Auditorium, 'findOne').resolves();
        sinon.stub(Auditorium, 'findOneAndUpdate').resolves();
        auditoriumIncompletePutTest;
    });
    it('Failed - Wrong id',() => {
        sinon.stub(Auditorium, 'findOne').resolves(null);
        sinon.stub(Auditorium, 'findOneAndUpdate').resolves();
        auditoriumWrongIdPutTest;
    });
    it('Failed - Db error',() => {
        sinon.stub(Auditorium, 'findOne').throws();
        sinon.stub(Auditorium, 'findOneAndUpdate').resolves();
        auditoriumPutTest;
    });
});
