const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

const Auditorium = require("../../../db/models/auditoriums");
const Seat = require("../../../db/models/seats");

const auditorium2 = {
    number: 2,
    seatRows: 20,
    seatColumns: 10,
};

async function auditoriumPostTest() {
    this.timeout(5000);
    await request(app)
        .post('/auditoriums')
        .send(auditorium2)
        .then(res => {
            res.should.be.an('object');
            assert.strictEqual(res.status, 200);
        })
        .catch(err => {
            console.log(err);
        })
}

async function auditoriumEmptyPostTest() {
    await request(app)
        .post('/auditoriums')
        .send()
        .then(res => {
            assert.strictEqual(res.status, 400);
        })
        .catch(err => {
            console.log(err);
        })
}

async function auditoriumWrongNumberPostTest() {
    await request(app)
        .post('/auditoriums')
        .send({ number : "one"})
        .then(res => {
            assert.strictEqual(res.status, 400);
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Auditorium Post Test", function () {
    beforeEach(() => {
        sinon.stub(Auditorium, 'create').resolves(auditorium2);
        sinon
            .stub(Auditorium.prototype, 'save')
            .resolves(() => auditorium2);
        sinon.stub(Seat, 'create').resolves(auditorium2);
        sinon
            .stub(Seat.prototype, 'save')
            .resolves(() => auditorium2);
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
