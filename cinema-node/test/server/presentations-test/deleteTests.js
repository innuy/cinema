const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Presentation = require("../../../db/models/presentations");
const Ticket = require("../../../db/models/tickets");

const testingMovieId = '5c2f723b62607929f4c347d3';
const testingAuditoriumId = '5c34a1ce4150f31a815d41b4';
const testingPresentationIdToDelete = '5c2e105c8509f424122c4067';
const testingPresentationWrongIdToDelete = '000000000000000000000001';

const date = new Date("August 25, 1825 12:00:00");

const testingPresentationData = {
    movie: testingMovieId,
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
};

function presentationDeleteTestbyId(done) {
    request(app.app)
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
    request(app.app)
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

function presentationDbErrorWhenCheckingPresentationTest(done) {
    request(app.app)
        .del('/presentations/' + testingPresentationWrongIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 500);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function presentationDbErrorWhenDeletingPresentationTest(done) {
    request(app.app)
        .del('/presentations/' + testingPresentationWrongIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 500);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function presentationDbErrorWhenDeletingTicketsTest(done) {
    request(app.app)
        .del('/presentations/' + testingPresentationWrongIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 500);
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
        Presentation.findById.restore();
        Presentation.findOneAndDelete.restore();
        Ticket.deleteMany.restore();
    });

    it('Successful - Delete presentation', (done) => {
        sinon.stub(Presentation, 'findById').resolves([testingPresentationData]);
        sinon.stub(Presentation, 'findOneAndDelete').resolves();
        sinon.stub(Ticket, 'deleteMany').resolves();
        presentationDeleteTestbyId(done);
    });
    it('Failed - DB error when checking presentations', (done) => {
        sinon.stub(Presentation, 'findById').rejects(Error("Db error"));
        sinon.stub(Presentation, 'findOneAndDelete').rejects(Error("Db error"));
        sinon.stub(Ticket, 'deleteMany').resolves();
        presentationDbErrorWhenCheckingPresentationTest(done);
    });
    it('Failed - DB error when deleting presentations', (done) => {
        sinon.stub(Presentation, 'findById').resolves([testingPresentationData]);
        sinon.stub(Presentation, 'findOneAndDelete').resolves();
        sinon.stub(Ticket, 'deleteMany').rejects(Error("Db error"));
        presentationDbErrorWhenDeletingPresentationTest(done);
    });
    it('Failed - DB error when deleting tickets', (done) => {
        sinon.stub(Presentation, 'findById').resolves([testingPresentationData]);
        sinon.stub(Presentation, 'findOneAndDelete').resolves();
        sinon.stub(Ticket, 'deleteMany').rejects(Error("Db error"));
        presentationDbErrorWhenDeletingTicketsTest(done);
    });
    it('Failed - Wrong id', (done) => {
        sinon.stub(Presentation, 'findById').resolves(null);
        sinon.stub(Presentation, 'findOneAndDelete').resolves();
        sinon.stub(Ticket, 'deleteMany').resolves();
        presentationWrongIdDeleteTest(done);
    });
});
