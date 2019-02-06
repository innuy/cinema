const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Auditorium = require("../../../db/models/auditoriums");
const testingAuditoriumIdToDelete = '5c2e105c8509f424122c4067';
const testingAuditoriumWrongIdToDelete = '000000000000000000000001';
const testingAuditoriumData = {
    number: 2,
    seatRows: 20,
    seatColumns: 10,
};

function auditoriumDeleteTestbyId(done) {
    request(app)
        .del('/auditoriums/' + testingAuditoriumIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 204);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}

function auditoriumWrongIdDeleteTest(done) {
    request(app)
        .del('/auditoriums/' + testingAuditoriumWrongIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                console.log(res.status);
                assert.equal(res.status, 404);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Auditorium Delete by id test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Auditorium.findOne.restore();
        Auditorium.findOneAndDelete.restore();
    });

    it('Successful - Delete auditorium', (done) => {
        sinon.stub(Auditorium, 'findOne').resolves([testingAuditoriumData]);
        sinon.stub(Auditorium, 'findOneAndDelete').resolves();
        auditoriumDeleteTestbyId(done);
    });
    it('Failed - Wrong id', (done) => {
        sinon.stub(Auditorium, 'findOne').resolves(null);
        sinon.stub(Auditorium, 'findOneAndDelete').resolves(null);
        auditoriumWrongIdDeleteTest(done);
    });
});
