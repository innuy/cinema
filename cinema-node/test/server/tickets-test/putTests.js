const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;
let dashboardNamespace;
let dashboardSocket;
let reservingTicketsSocket;
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
    sold: true,
};
const testingTicketDataWithTicketWrongInformation = {
    presentation: testingWrongId,
    seat: testingSeatId,
    sold: true,
};
const testingTicketDataWithSeatWrongInformation = {
    presentation: testingTicketId,
    seat: testingWrongId,
    sold: true,
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
    request(app.app)
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
    request(app.app)
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
    request(app.app)
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
        sinon.stub(Ticket, 'findByIdAndUpdate').resolves(testingTicketData);
        sinon.stub(Ticket, 'findById').resolves(testingTicketData);
        app = require('../../../app');

        dashboardNamespace = app.dashboardNamespace;
        dashboardSocket = require('../../../websockets/dashboard');
        reservingTicketsSocket = require('../../../websockets/ticketReservation');
        sinon.stub(dashboardSocket, 'sendDataToDashboardNamespace').resolves('ok');
        sinon.stub(reservingTicketsSocket, 'sendTicketListToCurrentPresentationRoom').resolves('ok');
    });
    afterEach(() => {
        Ticket.findByIdAndUpdate.restore();
        Ticket.findById.restore();
        Presentation.findById.restore();
        Seat.findById.restore();
        dashboardSocket.sendDataToDashboardNamespace.restore();
        reservingTicketsSocket.sendTicketListToCurrentPresentationRoom.restore();
    });

    it('Successful - Update ticket', (done) => {
        ticketWithAlreadyStartedTicketPostTest(done);
    });
    it('Failed - Request with wrong ticket id ', (done) => {
        Ticket.findByIdAndUpdate.restore();
        sinon.stub(Ticket, 'findByIdAndUpdate').resolves(null);
        ticketWrongTicketIdPostTest(done);
    });
    it('Failed - Db error test', (done) => {
        Ticket.findByIdAndUpdate.restore();
        sinon.stub(Ticket, 'findByIdAndUpdate').rejects(Error("DB error"));
        ticketWithDbErrorPostTest(done);
    });
});
