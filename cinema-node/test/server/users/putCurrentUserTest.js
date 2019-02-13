const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const User = require("../../../db/models/users");

const token = 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik5hY2hvQGFkbWluLmNvbSIsImlkIjoiNWM2MWNiYTMxNmRlZDA2YzNlZjFkMzE0IiwiZXhwIjoxNTU1MDk3MzMwLCJyb2xlIjoyLCJpYXQiOjE1NDk5MTMzMzB9.ecCfUNsvCHIIQ_U6s5KH2HoAr56iwCBnC29R2oi0bKw'
const wrongToken = 'Token 111111111111111111111111111111eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik5hY2hvQGFkbWluLmNvbSIsImlkIjoiNWM2MWNiYTMxNmRlZDA2YzNlZjFkMzE0IiwiZXhwIjoxNTU1MDk3MzMwLCJyb2xlIjoyLCJpYXQiOjE1NDk5MTMzMzB9.ecCfUNsvCHIIQ_U6s5KH2HoAr56iwCBnC29R2oi0bKw'

const userData = {
    name: "Great",
    surname: "uset",
    email: "test@test.com",
};
const wrongEmailUserData = {
    name: "Great",
    surname: "uset",
    email: "totally not an email",
};
const wrongPasswordUserData = {
    name: "Great",
    surname: "uset",
    email: "test@test.com",
};

function putCurrentUserTest(done) {
    request(app)
        .put('/users/current')
        .send(userData)
        .set('Authorization', token)
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

function putCurrentUserWrongTokenTest(done) {
    request(app)
        .put('/users/current')
        .send(userData)
        .set('Authorization', wrongToken)
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 401);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function putCurrentUserWrongEmailTest(done) {
    request(app)
        .put('/users/current')
        .send(userData)
        .set('Authorization', token)
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 404);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function putCurrentUserDbErrorTest(done) {
    request(app)
        .put('/users/current')
        .send(userData)
        .set('Authorization', token)
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

describe("Current User Put Test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        User.findOneAndUpdate.restore();
    });

    it('Successful - Put current user', (done) => {
        sinon.stub(User, 'findOneAndUpdate').resolves(new User(userData));
        putCurrentUserTest(done);
    });

    it('Failed - Wrong token', (done) => {
        sinon.stub(User, 'findOneAndUpdate').resolves(new User(userData));
        putCurrentUserWrongTokenTest(done);
    });

    it('Failed - Wrong user', (done) => {
        sinon.stub(User, 'findOneAndUpdate').resolves(null);
        putCurrentUserWrongEmailTest(done);
    });

    it('Failed - DB error', (done) => {
        sinon.stub(User, 'findOneAndUpdate').rejects(Error("Db error"));
        putCurrentUserDbErrorTest(done);
    });
});
