const sinon = require('sinon');
var chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const request = require('supertest');
let app;

require('../setup');

const User = require("../../../db/models/users");

const testingUserIdToSearch = '5c2d020e4b4dee53e9fd3f9b';
const testingUserWrongIdToSearch = '000000000000000000000001';

const testingUpdateUserData = {
    name: "Great",
    surname: "uset",
    email: "test@test.com",
    role: "1",
};

const testingIncompleteUserData = {
    name: "Great",
    surname: "uset",
    role: "1",
};

function userPutTest(done) {
    request(app)
        .put('/users/' + testingUserIdToSearch)
        .send(testingUpdateUserData)
        .then(res => {
            setTimeout(() => {
                res.body.should.be.an('object');
                res.status.should.equal(200);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function userIncompletePutTest(done) {
    request(app)
        .put('/users/' + testingUserIdToSearch)
        .send(testingIncompleteUserData)
        .then(res => {
            setTimeout(() => {
                res.body.should.be.an('object');
                res.status.should.equal(400);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function userWrongIdPutTest(done) {
    request(app)
        .put('/users/' + testingUserWrongIdToSearch)
        .send(testingUpdateUserData)
        .then(res => {
            setTimeout(() => {
                res.body.should.be.an('object');
                res.status.should.equal(404);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function userWrongIdPutTest(done) {
    request(app)
        .put('/users/' + testingUserWrongIdToSearch)
        .send(testingUpdateUserData)
        .then(res => {
            setTimeout(() => {
                res.body.should.be.an('object');
                res.status.should.equal(404);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}

function userDbErrorPutTest(done) {
    request(app)
        .put('/users/' + testingUserIdToSearch)
        .send(testingUpdateUserData)
        .then(res => {
            setTimeout(() => {
                res.body.should.be.an('object');
                res.status.should.equal(500);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}


describe("User Put Test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        User.findOneAndUpdate.restore();
    });

    it('Successful - Update user', (done) => {
        sinon.stub(User, 'findOneAndUpdate').resolves();
        userPutTest(done);
    });
    it('Failed - Incomplete user data', (done) => {
        sinon.stub(User, 'findOneAndUpdate').resolves();
        userIncompletePutTest(done);
    });
    it('Failed - Wrong id', (done) => {
        sinon.stub(User, 'findOneAndUpdate').resolves(null);
        userWrongIdPutTest(done);
    });
    it('Failed - Db id', (done) => {
        sinon.stub(User, 'findOneAndUpdate').rejects();
        userDbErrorPutTest(done);
    });
});
