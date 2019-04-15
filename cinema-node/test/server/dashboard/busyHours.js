const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Tickets = require("../../../db/models/tickets");

const testingBusyTimesAnswerData = [
    {
        "hour": 21,
        "tickets": 2
    },
    {
        "hour": 16,
        "tickets": 11
    },
    {
        "hour": 13,
        "tickets": 11
    }
];

function getBusyTimes(done) {
    request(app.app)
        .get('/dashboard/busy-times')
        .query()
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 200);
                assert.strictEqual(res.body.length, 24);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function getBusyTimesDbError(done) {
    request(app.app)
        .get('/dashboard/busy-times')
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
        sinon.stub(Tickets, 'aggregate').resolves(testingBusyTimesAnswerData);
        getBusyTimes(done);
    });

    it('Failed - Db error', (done) => {
        sinon.stub(Tickets, 'aggregate').rejects(Error("Db error"));
        getBusyTimesDbError(done);
    });
});
