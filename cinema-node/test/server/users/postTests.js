const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const User = require("../../../db/models/users");
const auth = require('../../../middlewares/auth');

const userToken = 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik5hY2hvN0B0ZXN0LmNvbSIsImlkIjoiNWM2MTk3OTJmYjE3NzMzZGI4NGVmMTRkIiwiZXhwIjoxNTU1MzM2ODk1LCJyb2xlIjoxLCJpYXQiOjE1NTAxNTI4OTV9.YPpv-2Jvr-BOaskBIHTlMTVqDmS730a6XBIyZJboIuw'
const adminToken = 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik5hY2hvQGFkbWluLmNvbSIsImlkIjoiNWM2MWNiYTMxNmRlZDA2YzNlZjFkMzE0IiwiZXhwIjoxNTU1MDk3MzMwLCJyb2xlIjoyLCJpYXQiOjE1NDk5MTMzMzB9.ecCfUNsvCHIIQ_U6s5KH2HoAr56iwCBnC29R2oi0bKw'
const wrongToken = 'Token 111111111111111111111111111111eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik5hY2hvQGFkbWluLmNvbSIsImlkIjoiNWM2MWNiYTMxNmRlZDA2YzNlZjFkMzE0IiwiZXhwIjoxNTU1MDk3MzMwLCJyb2xlIjoyLCJpYXQiOjE1NDk5MTMzMzB9.ecCfUNsvCHIIQ_U6s5KH2HoAr56iwCBnC29R2oi0bKw'

const userData = {
    name: "Great",
    surname: "user",
    email: "test@test.com",
    role: "1",
    password: "password",
};
const adminData = {
    name: "Great",
    surname: "user",
    email: "test@test.com",
    role: "2",
    password: "password",
};

function createUserTest(done) {
    request(app)
        .post('/users')
        .send(userData)
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

function createUserWithEmptyRequestTest(done) {
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

function createUserWithWrongNameTest(done) {
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

function createUserDbErrorTest(done) {
    request(app)
        .post('/users')
        .send(userData)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 500);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function adminCreatingAdminTest(done) {
    request(app)
        .post('/users')
        .send(adminData)
        .set('Authorization', adminToken)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 200);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function userCreatingAdminTest(done) {
    request(app)
        .post('/users')
        .send(adminData)
        .set('Authorization', userToken)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 401);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

describe("User Post Test", function () {
    beforeEach(() => {
        // sinon.stub(User, 'create').resolves(userData);
        sinon
            .stub(User.prototype, 'save')
            .resolves(() => userData);
        app = require('../../../app');
    });

    afterEach(() => {
        // User.create.restore();
        User.prototype.save.restore();
    });

    it('Successful - Create user with user', createUserTest);
    it('Failed - Empty request', createUserWithEmptyRequestTest);
    it('Failed - Request with wrong name ', createUserWithWrongNameTest);
    it('Failed - Db Error ', (done) => {
        User.prototype.save.restore();
        sinon
            .stub(User.prototype, 'save')
            .rejects(Error("Db error"));
        createUserDbErrorTest(done);
    });
    //TODO duplicate key error test
    it('Successful - Create admin with admin', (done) => {
        auth.adminOnly.restore();
        sinon.stub(auth, 'adminOnly').callsFake((req, res, next) => {
            next();
        });
        adminCreatingAdminTest(done);
    });
    it('Failed - Create admin with user', (done) => {
        auth.adminOnly.restore();
        sinon.stub(auth, 'adminOnly').callsFake((req, res, next) => {
            next();
        });
        userCreatingAdminTest(done);
    });
});
