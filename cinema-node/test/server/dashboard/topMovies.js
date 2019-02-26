const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Tickets = require("../../../db/models/tickets");

const testingTopMoviesAnswerData = [
    {
        "count": 3,
        "movie": {
            "_id": "5c549a583dbd36430d858af4",
            "actors": [
                "Buzz",
                "Woody",
                "Andy"
            ],
            "name": "Toy Story",
            "image": "image link",
            "duration": "1h10m",
            "summary": "Great movie",
            "director": "John Lasseter",
            "__v": 0
        }
    },
    {
        "count": 1,
        "movie": {
            "_id": "5c65c16af105ca06420dfe0f",
            "actors": [
                "Tom Hanks",
                "Tim Allen",
                "Don Rickles"
            ],
            "name": "Toy Story",
            "duration": "1h21m",
            "summary": "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
            "director": "John Lasseter",
            "__v": 0
        }
    }
];

function getTopMoviesEmptyAmount(done) {
    request(app.app)
        .get('/dashboard/top-movies')
        .query()
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                res.body.should.be.an('array');
                assert.strictEqual(res.status, 200);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function getTopMoviesWithAmount(done) {
    request(app.app)
        .get('/dashboard/top-movies')
        .query({amount: 5})
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                res.body.should.be.an('array');
                assert.strictEqual(res.status, 200);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function getTopMoviesWrongAmount(done) {
    request(app.app)
        .get('/dashboard/top-movies')
        .query({amount: -1})
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


function getTopMoviesDbError(done) {
    request(app.app)
        .get('/dashboard/top-movies')
        .query()
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



describe("Dashboard - Top movies tests", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Tickets.aggregate.restore();
    });

    it('Successful - Get list with filters', (done) => {
        sinon.stub(Tickets, 'aggregate').resolves([testingTopMoviesAnswerData]);
        getTopMoviesEmptyAmount(done);
    });

    it('Successful - Get list without filters', (done) => {
        sinon.stub(Tickets, 'aggregate').resolves([testingTopMoviesAnswerData]);
        getTopMoviesWithAmount(done);
    });

    it('Failed - Wrong filters', (done) => {
        sinon.stub(Tickets, 'aggregate').resolves(null);
        getTopMoviesWrongAmount(done);
    });

    it('Failed - Wrong id', (done) => {
        sinon.stub(Tickets, 'aggregate').rejects(Error("Db error"));
        getTopMoviesDbError(done);
    });
});
