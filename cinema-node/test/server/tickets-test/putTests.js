const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Ticket = require("../../../db/models/tickets");
const Seat = require("../../../db/models/seats");
const Presentation = require("../../../db/models/presentations");

const testingTicketId = '5c3606876e57543fe8a5787c';
const testingPresentationId = '5c3606876e57543fe8a5787c';
const testingSeatId = '5c34a1ce4150f31a815d41b4';
const testingWrongId = '000000000000000000000001';

const testingMovieId = '5c2f723b62607929f4c347d3';
const testingAuditoriumId = '5c34a1ce4150f31a815d41b4';

const oldDate = new Date("August 25, 1825 12:00:00");
const futureDate = new Date("August 25, 2025 12:00:00");

let testingTicketIdToSearch = '5c38a64e32b718516d4b5c50';
let testingTicketWrongId = '000000000000000000000001';

const testingTicketData = {
    presentation: testingTicketId,
    seat: testingSeatId,
};
const testingTicketDataWithTicketWrongInformation = {
    presentation: testingWrongId,
    seat: testingSeatId,
};
const testingTicketDataWithSeatWrongInformation = {
    presentation: testingTicketId,
    seat: testingWrongId,
};
const testingSeatData = {
    _id: testingSeatId,
    auditorium: testingAuditoriumId,
    number: 2,
    seatRows: 20,
    seatColumns: 10,
};
const testingPresentationData = {
    _id: testingPresentationId,
    movie: testingMovieId,
    auditorium: testingAuditoriumId,
    start: futureDate.toISOString(),
};

function ticketWithAlreadyStartedTicketPostTest(done) {
    request(app)
        .put('/tickets/' + testingTicketIdToSearch)
        .send(testingTicketDataWithTicketWrongInformation)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 200);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function ticketWithDbErrorPostTest(done) {
    request(app)
        .put('/tickets/' + testingTicketIdToSearch)
        .send(testingTicketDataWithTicketWrongInformation)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 500);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function ticketWrongTicketIdPostTest(done) {
    request(app)
        .put('/tickets/' + testingTicketWrongId)
        .send(testingTicketDataWithSeatWrongInformation)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 404);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Ticket Put Test", function () {
    beforeEach(() => {
        sinon.stub(Seat, 'findById').resolves(testingSeatData);
        sinon.stub(Presentation, 'findById').resolves(testingPresentationData);
        sinon.stub(Ticket, 'findOneAndUpdate').resolves(testingTicketData);
        app = require('../../../app');
    });
    afterEach(() => {
        Ticket.findOneAndUpdate.restore();
        ;
        Presentation.findById.restore();
        Seat.findById.restore()
    });

    it('Successful - Update ticket', (done) => {
        ticketWithAlreadyStartedTicketPostTest(done);
    });
    it('Failed - Request with wrong ticket id ', (done) => {
        Ticket.findOneAndUpdate.restore();
        sinon.stub(Ticket, 'findOneAndUpdate').resolves(null);
        ticketWrongTicketIdPostTest(done);
    });
    it('Failed - Db error test', (done) => {
        Ticket.findOneAndUpdate.restore();
        sinon.stub(Ticket, 'findOneAndUpdate').rejects(Error("DB error"));
        ;
        ticketWithDbErrorPostTest(done);
    });
});
