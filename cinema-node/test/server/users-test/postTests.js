const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const User = require("../../../db/models/users");

const testingUserData = {
    name: "Great",
    surname: "uset",
    email: "test@test.com",
    role: "1",
};

function userPostTest(done) {
    request(app)
        .post('/users')
        .send(testingUserData)
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

function userEmptyPostTest(done) {
    request(app)
        .post('/users')
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

function userWrongNamePostTest(done) {
    request(app)
        .post('/users')
        .send({name: 1})
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

describe("User Post Test", function () {
    beforeEach(() => {
        sinon.stub(User, 'create').resolves(testingUserData);
        sinon
            .stub(User.prototype, 'save')
            .resolves(() => testingUserData);
        app = require('../../../app');
    });

    afterEach(() => {
        User.create.restore();
        User.prototype.save.restore();
    });

    it('Successful - Create user', userPostTest);
    it('Failed - Empty request', userEmptyPostTest);
    it('Failed - Request with wrong name ', userWrongNamePostTest);
});
