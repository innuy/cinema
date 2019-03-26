const sinon = require('sinon');
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Ticket = require("../../../db/models/tickets");
const Presentation = require("../../../db/models/presentations");
const Seat = require("../../../db/models/seats");

const testingPresentationId = '5c3606876e57543fe8a5787c';
const testingSeatId = '5c34a1ce4150f31a815d41b4';
const testingWrongId = '000000000000000000000001';

const testingMovieId = '5c2f723b62607929f4c347d3';
const testingAuditoriumId = '5c34a1ce4150f31a815d41b4';

const oldDate = new Date("August 25, 1825 12:00:00");
const futureDate = new Date("August 25, 2025 12:00:00");

const testingTicketData = {
    presentation: testingPresentationId,
    seat: testingSeatId,
};
const testingTicketDataWithWrongInformation = {
    presentation: 'Toy Story',
    seat: testingSeatId,
};
const testingTicketDataWithPresentationWrongInformation = {
    presentation: testingWrongId,
    seat: testingSeatId,
};
const testingTicketDataWithSeatWrongInformation = {
    presentation: testingPresentationId,
    seat: testingWrongId,
};

const testingPresentationData = {
    _id: testingPresentationId,
    movie: testingMovieId,
    auditorium: testingAuditoriumId,
    start: futureDate.toISOString(),
};
const testingPresentationDataOldDate = {
    _id: testingPresentationId,
    movie: testingMovieId,
    auditorium: testingAuditoriumId,
    start: oldDate.toISOString(),
};

const testingSeatData = {
    _id: testingSeatId,
    auditorium: "5c37ac1e638afe1e734f9cfe",
    number: 2,
    seatRows: 20,
    seatColumns: 10,
};

function ticketPostTest(done) {
    timeout(10000);
    request(app.app)
        .post('/tickets')
        .send(testingTicketData)
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 200);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function ticketEmptyPostTest(done) {
    request(app.app)
        .post('/tickets')
        .send()
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 400);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function ticketWrongInformationPostTest(done) {
    request(app.app)
        .post('/tickets')
        .send(testingTicketDataWithWrongInformation)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 400);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function ticketDbErrorPostTest(done) {
    request(app.app)
        .post('/tickets')
        .send(testingTicketData)
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 500);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function ticketWrongPresentationIdPostTest(done) {
    request(app.app)
        .post('/tickets')
        .send(testingTicketDataWithPresentationWrongInformation)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 412);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function tickeWithAlreadyStartedPresentationPostTest(done) {
    request(app.app)
        .post('/tickets')
        .send(testingTicketDataWithSeatWrongInformation)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 400);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Ticket Post Test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    it('Successful - Create ticket', () => {
        sinon.stub(Presentation, 'findOne').resolves(testingPresentationData);
        sinon.stub(Seat, 'findOne').resolves(testingSeatData);
        sinon.stub(Ticket, 'findOne').resolves(testingTicketData);
        sinon.stub(Ticket, 'create').resolves(testingTicketData);
        sinon.stub(Ticket.prototype, 'save')
            .resolves(() => testingTicketData);
        ticketPostTest;
        Ticket.prototype.save.restore();
        Ticket.create.restore();
        Ticket.findOne.restore();
        Seat.findOne.restore();
        Presentation.findOne.restore();
    });
    it('Failed - Empty request', ticketEmptyPostTest);
    it('Failed - Request with wrong name ', ticketWrongInformationPostTest);
});

describe("Ticket Post Test information related errors", function () {
    beforeEach(() => {
        app = require('../../../app');
    });
    afterEach(() => {
        Presentation.findOne.restore();
    });
    it('Failed - Db error when creating ticket', () => {
        sinon.stub(Presentation, 'findOne').resolves(testingPresentationData);
        sinon.stub(Seat, 'findOne').resolves(testingSeatData);
        sinon.stub(Ticket, 'findOne').resolves(testingTicketData);
        sinon.stub(Ticket, 'create').resolves(null);
        sinon.stub(Ticket.prototype, 'save')
            .resolves(() => testingTicketData);
        ticketDbErrorPostTest;
        Ticket.prototype.save.restore();
        Ticket.create.restore();
        Ticket.findOne.restore();
        Seat.findOne.restore();
    });
    it('Failed - Seat isn`t available', () => {
        sinon.stub(Presentation, 'findOne').resolves(testingPresentationData);
        sinon.stub(Seat, 'findOne').resolves(testingSeatData);
        sinon.stub(Ticket, 'findOne').resolves(null);
        ticketDbErrorPostTest;
        Ticket.findOne.restore();
        Seat.findOne.restore();
    });
    it('Failed - Request with a already started presentation ', (done) => {
        sinon.stub(Presentation, 'findOne').resolves(testingPresentationDataOldDate);
        sinon.stub(Seat, 'findOne').resolves(null);
        tickeWithAlreadyStartedPresentationPostTest(done);
        Seat.findOne.restore();
    });
    it('Failed - Request with wrong presentation id ', (done) => {
        sinon.stub(Presentation, 'findOne').resolves(null);
        ticketWrongPresentationIdPostTest(done);
    });
});