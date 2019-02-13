const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
const passport = require('passport');
let app;

require('../setup');

const User = require("../../../db/models/users");
const loginRequest = {
    "user": {
        email: "test@test.com",
        password: "password"
    }
};

const userData = {
    name: "Great",
    surname: "uset",
    email: "test@test.com",
    role: "1",
    password: "password",
};
const wrongEmailUserData = {
    name: "Great",
    surname: "uset",
    email: "totally not an email",
    role: "1",
    password: "password",
};
const wrongPasswordUserData = {
    name: "Great",
    surname: "uset",
    email: "test@test.com",
    role: "1",
    password: 123456789
};

function userLoginTest(done) {
    request(app)
        .post('/auth/login')
        .send(loginRequest)
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 200);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function userEmptyTest(done) {
    request(app)
        .post('/auth/login')
        .send({})
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 400);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function userWrongEmailTest(done) {
    request(app)
        .post('/auth/login')
        .send(wrongEmailUserData)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 400);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function userWrongPasswordTest(done) {
    request(app)
        .post('/auth/login')
        .send(wrongPasswordUserData)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 400);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

describe("User login Test", function () {
    beforeEach(() => {
        this.authenticate = sinon.stub(passport, 'authenticate').returns(() => {return 1});
        sinon.stub(User, 'create').resolves(userData);
        sinon
            .stub(User.prototype, 'save')
            .resolves(() => userData);

        this.authenticate.yields(null, new User(userData));
        app = require('../../../app');
    });
    afterEach(() => {
        this.authenticate.restore();
        User.create.restore();
        User.prototype.save.restore();
    });

    it('Successful - User login', userLoginTest);
    it('Failed - Empty request', userEmptyTest);
    it('Failed - Request with wrong email', userWrongEmailTest);
    it('Failed - Request with wrong password', userWrongPasswordTest);
});
