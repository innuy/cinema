const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const User = require("../../../db/models/users");
const testingUserIdToDelete = '5c2e105c8509f424122c4067';
const testingUserWrongIdToDelete = '000000000000000000000001';
const testingUserData = {
    name: "Great",
    surname: "user",
    email: "test@test.com",
    role: "1",
};

function userDeleteTestById(done) {
    request(app)
        .del('/users/' + testingUserIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 204);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}

function userWrongIdDeleteTest(done) {
    request(app)
        .del('/users/' + testingUserWrongIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 404);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}

describe("User Delete by id test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        User.find.restore();
        User.findOneAndDelete.restore();
    });

    it('Successful - Delete user', (done) => {
        sinon.stub(User, 'find').resolves([testingUserData]);
        sinon.stub(User, 'findOneAndDelete').resolves();
        userDeleteTestById(done);
    });
    it('Failed - Wrong id', (done) => {
        sinon.stub(User, 'find').resolves(null);
        sinon.stub(User, 'findOneAndDelete').resolves(null);
        userWrongIdDeleteTest(done);
    });
});
