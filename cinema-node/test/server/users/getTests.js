const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const User = require("../../../db/models/users");

const testingUserIdToSearch = '5c267aa85335a14c175cb0dd';

const testingUserWrongId = '100000000000000000000001';

const testingUserFilterData = {
    name: "Great User",
    role: 2,
};

const testingUserWrongFilterData = {
    number: "Great User",
};

function getUserListWithFilters(done) {
    request(app.app)
        .get('/users')
        .query(testingUserFilterData)
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                res.body.should.be.an('array');
                assert.strictEqual(res.status, 200);
                res.body.forEach(user => {
                    assert.strictEqual(user.name, testingUserFilterData.name)
                });
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}

function getUserListWithoutFilters(done) {
    request(app.app)
        .get('/users')
        .query()
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                res.body.should.be.an('array');
                assert.strictEqual(res.status, 200);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}

function getUserListWithWrongFilters(done) {
    request(app.app)
        .get('/users')
        .query(testingUserWrongFilterData)
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 400);
                done();
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function getUserById(done) {
    request(app.app)
        .get('/users/' + testingUserIdToSearch)
        .query()
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 200);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}

function getUserWithWrongId(done) {
    request(app.app)
        .get('/users/' + testingUserWrongId)
        .query()
        .then(res => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.strictEqual(res.status, 404);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        });
}


describe("User Get Test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        User.find.restore();
    });

    it('Successful - Get list with filters', (done) => {
        sinon.stub(User, 'find').resolves([testingUserFilterData]);
        getUserListWithFilters(done);
    });

    it('Successful - Get list without filters', (done) => {
        sinon.stub(User, 'find').resolves([testingUserFilterData, testingUserFilterData]);
        getUserListWithoutFilters(done);
    });

    it('Failed - Wrong filters', (done) => {
        sinon.stub(User, 'find').rejects();
        getUserListWithWrongFilters(done);
    });

    it('Successful - Get one by id', (done) => {
        sinon.stub(User, 'find').resolves(testingUserFilterData);
        getUserById(done);
    });

    it('Failed - Wrong id', (done) => {
        sinon.stub(User, 'find').resolves(null);
        getUserWithWrongId(done);
    });
});
