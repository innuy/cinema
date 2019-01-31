const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
const Ticket = require("../../../db/models/tickets");
const Presentation = require("../../../db/models/presentations");
const Seat = require("../../../db/models/seats");
require('../setup');

let app;


const ticketModel = {
    presentation: '5c37ac34638afe1e734f9d63',
    seat: '5c37ac1e638afe1e734f9d03',
};
const ticketFilter = {
    presentation: '5c37ac34638afe1e734f9d63',
};
const ticketSeatIdFilter = {
    seat: '5c37ac1e638afe1e734f9d03',
};
const ticketSeatRowAndColumnFilter = {
    presentation: '5c37ac34638afe1e734f9d63',
    seatRow: '9',
    seatColumn: '7',
};

const presentationModel = {
    "_id": "5c37ac34638afe1e734f9d63",
    "movie": "5c2f723b62607929f4c347d3",
    "auditorium": "5c37ac1e638afe1e734f9cfe",
    "start": "2019-02-20T13:52:22.000Z",
    "__v": 0
};

const seatModel = {
    "row": 1,
    "column": 1,
    "auditorium": "5c37ac1e638afe1e734f9cfe",
};


function getTicketWithFilters(done) {

    request(app)
        .get('/tickets')
        .query(ticketFilter)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 200);
                res.should.be.an('object');
                res.body.should.be.an('array');
                res.body.forEach(ticket => {
                    assert.strictEqual(ticket.presentation, ticketFilter.presentation);
                });
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })

}

function getTicketWithSeatIdFilters(done) {

    request(app)
        .get('/tickets')
        .query(ticketSeatIdFilter)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 200);
                res.should.be.an('object');
                res.body.should.be.an('array');
                res.body.forEach(ticket => {
                    assert.strictEqual(ticket.seat, ticketSeatIdFilter.seat);
                });
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function getTicketWithSeatRowAndColumnFilters(done) {

    request(app)
        .get('/tickets')
        .query(ticketSeatRowAndColumnFilter)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 200);
                res.should.be.an('object');
                res.body.should.be.an('array');
                res.body.forEach(ticket => {
                    assert.strictEqual(ticket.presentation, ticketFilter.presentation);
                });
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Ticket Get Test", function () {
    beforeEach(() => {
        sinon.stub(Ticket, 'find').returns({
            populate: sinon.stub().callsFake(function fakeFn() {
                return new Promise((resolve,reject)=>{
                    resolve([ticketModel])
                })
            })
        });
        sinon.stub(Presentation, 'findOne').resolves(presentationModel);
        sinon.stub(Seat, 'findOne').resolves(seatModel);

        app = require('../../../app');
    });

    afterEach(function () {
        Ticket.find.restore();
        Presentation.findOne.restore();
        Seat.findOne.restore();
    });
    it('Successful - Get list with filters', (done) => {
        getTicketWithFilters(done);
    });
    it('Successful - Get list with seat id filters', (done) => {
        getTicketWithSeatIdFilters(done);
    });
    it('Successful - Get list with seat row and column filters', (done) => {
        getTicketWithSeatRowAndColumnFilters(done);
    });

});