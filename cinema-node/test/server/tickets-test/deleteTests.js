const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Ticket = require("../../../db/models/tickets");
const Presentation = require("../../../db/models/presentations");

const testingTicketId = '5c3606876e57543fe8a5787c';
const testingMovieId = '5c2f723b62607929f4c347d3';
const testingAuditoriumId = '5c34a1ce4150f31a815d41b4';
const testingTicketIdToDelete = '5c2e105c8509f424122c4067';
const testingTicketWrongIdToDelete = '000000000000000000000001';

const futureDate = new Date("August 25, 2025 12:00:00");

const testingTicketData = {
    _id: testingTicketId,
    movie: testingMovieId,
    auditorium: testingAuditoriumId,
    start: futureDate.toISOString(),
};

const presentationModel = {
    _id: "5c37ac34638afe1e734f9d63",
    movie: "5c2f723b62607929f4c347d3",
    auditorium: "5c37ac1e638afe1e734f9cfe",
    start: "2019-02-20T13:52:22.000Z",
    __v: 0
};
const presentationModelOneLessTicketSold = {
    _id: "5c37ac34638afe1e734f9d63",
    movie: "5c2f723b62607929f4c347d3",
    auditorium: "5c37ac1e638afe1e734f9cfe",
    start: "2019-02-20T13:52:22.000Z",
    __v: 0
};

function ticketDeleteTestbyId(done) {
    request(app)
        .del('/tickets/' + testingTicketIdToDelete)
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

function ticketDeleteTestbyIdDatabaseError(done) {
    request(app)
        .del('/tickets/' + testingTicketIdToDelete)
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

function ticketWrongPresentationIdDeleteTest(done) {
    request(app)
        .del('/tickets/' + testingTicketIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 412);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function ticketWrongTicketIdDeleteTest(done) {
    request(app)
        .del('/tickets/' + testingTicketWrongIdToDelete)
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

describe("Ticket Delete by id test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Ticket.findById.restore();
        Presentation.findById.restore();
        Ticket.findOneAndDelete.restore();
    });

    it('Successful - Delete ticket', (done) => {
        sinon.stub(Ticket, 'findById').resolves(testingTicketData);
        sinon.stub(Presentation, 'findById').resolves(presentationModel);
        sinon.stub(Ticket, 'findOneAndDelete').resolves();
        ticketDeleteTestbyId(done);
    });
    it('Failed -Database error', (done) => {
        sinon.stub(Ticket, 'findById').resolves(testingTicketData);
        sinon.stub(Presentation, 'findById').rejects(presentationModel);
        sinon.stub(Ticket, 'findOneAndDelete').resolves();
        ticketDeleteTestbyIdDatabaseError(done);
    });
    it('Failed - Wrong presentation id', (done) => {
        sinon.stub(Ticket, 'findById').resolves(testingTicketData);
        sinon.stub(Presentation, 'findById').resolves(null);
        sinon.stub(Ticket, 'findOneAndDelete').resolves(null);
        ticketWrongPresentationIdDeleteTest(done);
    });
    it('Failed - Wrong ticket id', (done) => {
        sinon.stub(Ticket, 'findById').resolves(null);
        sinon.stub(Presentation, 'findById').resolves(null);
        sinon.stub(Ticket, 'findOneAndDelete').resolves(null);
        ticketWrongTicketIdDeleteTest(done);
    });
});
