const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const User = require("../../../db/models/users");

const userData = {
    name: "Great User",
    role: 2,
};

const token = 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik5hY2hvQGFkbWluLmNvbSIsImlkIjoiNWM2MWNiYTMxNmRlZDA2YzNlZjFkMzE0IiwiZXhwIjoxNTU1MDk3MzMwLCJyb2xlIjoyLCJpYXQiOjE1NDk5MTMzMzB9.ecCfUNsvCHIIQ_U6s5KH2HoAr56iwCBnC29R2oi0bKw'

const wrongToken = 'Token 111111111111111111111111111111eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik5hY2hvQGFkbWluLmNvbSIsImlkIjoiNWM2MWNiYTMxNmRlZDA2YzNlZjFkMzE0IiwiZXhwIjoxNTU1MDk3MzMwLCJyb2xlIjoyLCJpYXQiOjE1NDk5MTMzMzB9.ecCfUNsvCHIIQ_U6s5KH2HoAr56iwCBnC29R2oi0bKw'

function getCurrentUserTest(done) {
    request(app)
        .get('/users/current')
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

function getCurrentUserWrongTokenTest(done) {
    request(app)
        .get('/users/current')
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

describe("Current User Get Test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        User.findById.restore();
    });

    it('Successful - Get current user', (done) => {
        sinon.stub(User, 'findById').resolves(new User(userData));
        getCurrentUserTest(done);
    });

    it('Failed - Wrong token', (done) => {
        sinon.stub(User, 'findById').resolves(new User(userData));
        getCurrentUserWrongTokenTest(done);
    });
});
