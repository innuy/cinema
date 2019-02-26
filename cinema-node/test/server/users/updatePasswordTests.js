const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
const passport = require('passport');
let app;

require('../setup');

const User = require("../../../db/models/users");

const userData = {
    name: "Great",
    surname: "user",
    email: "asdf1234@test.com",
    role: "2",
    hash: "1234",
    salt: "1234"
};

const passwordUpdateRequest = {
    user: {
        email: "asdf1234@test.com",
        password: "password1"
    },
    newPassword: "password2"
};
const wrongEmailUserData = {
    user: {
        email: "totally not an email",
        password: "password1"
    },
    newPassword: "password2"
};
const wrongPasswordUserData = {
    user: {
        email: "asdf1234@test.com",
        password: 123456789
    },
    newPassword: "password2"
};

function passwordUpdatedTest(done) {
    request(app.app)
        .patch('/users')
        .send(passwordUpdateRequest)
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

function passwordUpdatedEmptyTest(done) {
    request(app.app)
        .patch('/users')
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

function passwordUpdatedWrongEmailTest(done) {
    request(app.app)
        .patch('/users')
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

function passwordUpdatedWrongPasswordTest(done) {
    request(app.app)
        .patch('/users')
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

function passwordUpdatedWrongAuthenticationTest(done) {
    request(app.app)
        .patch('/users')
        .send(passwordUpdateRequest)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 403);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function passwordUpdatedAuthenticationErrorsTest(done) {
    request(app.app)
        .patch('/users')
        .send(passwordUpdateRequest)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 403);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function passwordUpdatedDbErrorTest(done) {
    request(app.app)
        .patch('/users')
        .send(passwordUpdateRequest)
        .then(res => {
            setTimeout(() => {
                assert.strictEqual(res.status, 500);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        });
}

describe("User update password test", function () {
    beforeEach(() => {
        this.authenticate = sinon.stub(passport, 'authenticate').returns(() => {
            return 1
        });
        this.authenticate.yields(null, new User(userData));
        app = require('../../../app');
    });
    afterEach(() => {
        this.authenticate.restore();
        User.findByIdAndUpdate.restore();
    });

    it('Successful - Password updated', (done) => {
        sinon.stub(User, 'findByIdAndUpdate').resolves(new User(userData));
        passwordUpdatedTest(done);
    });
    it('Failed - Empty request', (done) => {
        sinon.stub(User, 'findByIdAndUpdate').resolves(new User(userData));
        passwordUpdatedEmptyTest(done);
    });
    it('Failed - Request with wrong email', (done) => {
        sinon.stub(User, 'findByIdAndUpdate').resolves(new User(userData));
        passwordUpdatedWrongEmailTest(done);
    });
    it('Failed - Request with wrong password', (done) => {
        sinon.stub(User, 'findByIdAndUpdate').resolves(new User(userData));
        passwordUpdatedWrongPasswordTest(done);
    });
    it('Failed - Wrong authentication', (done) => {
        this.authenticate.restore();
        this.authenticate = sinon.stub(passport, 'authenticate').returns(() => {
            return 1
        });
        this.authenticate.yields(null, null, {errors: {"email or password": "is invalid"}});
        sinon.stub(User, 'findByIdAndUpdate').resolves();
        passwordUpdatedWrongAuthenticationTest(done);
    });
    it('Failed - Authentication error', (done) => {
        this.authenticate.restore();
        this.authenticate = sinon.stub(passport, 'authenticate').returns(() => {
            return 1
        });
        this.authenticate.yields(Error("Authentication error"));
        sinon.stub(User, 'findByIdAndUpdate').resolves();
        passwordUpdatedAuthenticationErrorsTest(done);
    });
    it('Failed - Db error', (done) => {
        sinon.stub(User, 'findByIdAndUpdate').rejects(Error("Db error"));
        passwordUpdatedDbErrorTest(done);
    });

});
