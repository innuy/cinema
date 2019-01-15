const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Presentation = require("../../../db/models/presentations");

const testingMovieId = '5c2f723b62607929f4c347d3';
const testingAuditoriumId = '5c34a1ce4150f31a815d41b4';
const testingPresentationIdToDelete = '5c2e105c8509f424122c4067';
const testingPresentationWrongIdToDelete = '000000000000000000000001';

const date = new Date("August 25, 1825 12:00:00");

const testingPresentationData = {
    movie: testingMovieId,
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
    soldTickets: 0,
};

function presentationDeleteTestbyId(done) {
    request(app)
        .del('/presentations/' + testingPresentationIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 204);
            done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function presentationWrongIdDeleteTest(done) {
    request(app)
        .del('/presentations/' + testingPresentationWrongIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 404);
            done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Presentation Delete by id test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Presentation.find.restore();
        Presentation.findOneAndDelete.restore();
    });

    it('Successful - Delete presentation', () => {
        sinon.stub(Presentation, 'find').resolves([testingPresentationData]);
        sinon.stub(Presentation, 'findOneAndDelete').resolves();
        presentationDeleteTestbyId;
    });
    it('Failed - Wrong id', () => {
        sinon.stub(Presentation, 'find').resolves(null);
        sinon.stub(Presentation, 'findOneAndDelete').resolves(null);
        presentationWrongIdDeleteTest;
    });
});
