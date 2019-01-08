const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

const Auditorium = require("../../../db/models/auditoriums");

const testingAuditoriumIdToDelete = '5c2e105c8509f424122c4067';

const testingAuditoriumWrongIdToDelete = '000000000000000000000001';

const auditoriumGetTest = require('./getTests');

const testingAuditoriumData = {
    number: 2,
    seatRows: 20,
    seatColumns: 10,
};

async function auditoriumDeleteTestbyId() {
    await request(app)
        .del('/auditoriums/' + testingAuditoriumIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 204);
            });
        })
        .catch(err => {
            console.log(err);
        })
}

async function auditoriumWrongIdDeleteTest() {
    await request(app)
        .del('/auditoriums/' + testingAuditoriumWrongIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 404);
            });
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Auditorium Delete by id test", async function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Auditorium.find.restore();
        Auditorium.findOneAndDelete.restore();
    });

    it('Successful - Delete auditorium', () => {
        sinon.stub(Auditorium, 'find').resolves([testingAuditoriumData]);
        sinon.stub(Auditorium, 'findOneAndDelete').resolves();
        auditoriumDeleteTestbyId;
    });
    it('Failed - Wrong id', () => {
        sinon.stub(Auditorium, 'find').resolves(null);
        sinon.stub(Auditorium, 'findOneAndDelete').resolves(null);
        auditoriumWrongIdDeleteTest;
    });
});
