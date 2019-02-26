const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Tickets = require("../../../db/models/tickets");

const testingSoldRatioAnswerData = [{
    soldTickets:[
        {soldTickets:4}
        ],
    reservedTickets:[
        {reservedTickets:35}
        ]
}];

function getSoldRatio(done) {
    request(app.app)
        .get('/dashboard/sold-ratio')
        .query()
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

function getSoldRatioDbError(done) {
    request(app.app)
        .get('/dashboard/sold-ratio')
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 500);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Dashboard - Sold ratio test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Tickets.aggregate.restore();
    });

    it('Successful - Get sold ratio', (done) => {
        sinon.stub(Tickets, 'aggregate').resolves(testingSoldRatioAnswerData);
        getSoldRatio(done);
    });

    it('Failed - Db error', (done) => {
        sinon.stub(Tickets, 'aggregate').rejects(Error("Db error"));
        getSoldRatioDbError(done);
    });
});
