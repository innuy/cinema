const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Auditorium = require("../../../db/models/auditoriums");
const Seat = require("../../../db/models/seats");

const auditorium = {
    number: 2,
    seatRows: 20,
    seatColumns: 10,
};
const auditoriumWithId = {
    _id: "5c5af164e6c9c0289e7aaaf2",
    number: 2,
    seatRows: 20,
    seatColumns: 10,
};
const seat = {
    _id: "5c5af164e6c9c0289e7aaaf2",
    auditorium: "5c37ac1e638afe1e734f9cfe",
    row: 1,
    column: 1,
};

function auditoriumPostTest(done) {
    this.timeout(5000);
    request(app.app)
        .post('/auditoriums')
        .send(auditorium)
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 200);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function auditoriumEmptyPostTest(done) {
    request(app.app)
        .post('/auditoriums')
        .send()
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 400);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function auditoriumWrongNumberPostTest(done) {
    request(app.app)
        .post('/auditoriums')
        .send({number: "one"})
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 400);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function auditoriumSeatCreationIncompleteTest(done) {
    request(app.app)
        .post('/auditoriums')
        .send(auditorium)
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 500);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}


describe("Auditorium Post Test", function () {
    beforeEach(() => {

        app = require('../../../app');
    });

    afterEach(() => {
        Auditorium.create.restore();
        Auditorium.prototype.save.restore();
        Seat.create.restore();
        Seat.prototype.save.restore();
        Seat.deleteMany.restore();
        Auditorium.findOneAndDelete.restore();
    });

    it('Failed - Seat creation incomplete ', (done) => {
        sinon
            .stub(Auditorium, 'create')
            .resolves(auditoriumWithId);
        sinon
            .stub(Auditorium.prototype, 'save')
            .resolves(() => auditoriumWithId);
        sinon
            .stub(Seat, 'create')
            .onFirstCall().resolves(seat)
            .onSecondCall().rejects(Error('Db error in seat creation'));

        sinon
            .stub(Seat.prototype, 'save')
            .resolves(() => seat);
        sinon.stub(Seat, 'deleteMany').resolves();
        sinon.stub(Auditorium, 'findOneAndDelete').resolves();
        auditoriumSeatCreationIncompleteTest(done);
    });
});

describe("Auditorium Post Test", function () {
    beforeEach(() => {
        sinon
            .stub(Auditorium, 'create')
            .resolves(auditoriumWithId);
        sinon
            .stub(Auditorium.prototype, 'save')
            .resolves(() => auditoriumWithId);
        sinon
            .stub(Seat, 'create')
            .resolves(seat);
        sinon
            .stub(Seat.prototype, 'save')
            .resolves(() => seat);
        app = require('../../../app');
    });

    afterEach(() => {
        Auditorium.create.restore();
        Auditorium.prototype.save.restore();
        Seat.create.restore();
        Seat.prototype.save.restore();
    });

    it('Successful - Create auditorium', auditoriumPostTest);
    it('Failed - Empty request', auditoriumEmptyPostTest);
    it('Failed - Request with wrong number ', auditoriumWrongNumberPostTest);
});