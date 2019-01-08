const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

const Presentation = require("../../../db/models/presentations");

const testingPresentationIdToDelete = '5c2e105c8509f424122c4067';

const testingPresentationWrongIdToDelete = '000000000000000000000001';

const presentationGetTest = require('./getTests');

const testingPresentationData = {
    name: "Toy Story",
    image: "image link",
    duration: "1h10m",
    actors: ["Buzz"],
    summary: "Great presentation",
    director: "John Lasseter"
};

async function presentationDeleteTestbyId() {
    await request(app)
        .del('/presentations/' + testingPresentationIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 204);
            });
        })
        .catch(err => {
            console.log(err);
        })
}

async function presentationWrongIdDeleteTest() {
    await request(app)
        .del('/presentations/' + testingPresentationWrongIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 404);
            });
        })
        .catch(err => {
            console.log(err);
        })
}

describe("Presentation Delete by id test", async function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Presentation.find.restore();
        Presentation.findOneAndDelete.restore();
    });

    it('Successful - Delete presentation', () => {
        sinon.stub(Presentation, 'find').resolves([testingPresentationData]);
        sinon.stub(Presentation, 'findOneAndDelete').resolves();
        presentationDeleteTestbyId;
    });
    it('Failed - Wrong id', () => {
        sinon.stub(Presentation, 'find').resolves(null);
        sinon.stub(Presentation, 'findOneAndDelete').resolves(null);
        presentationWrongIdDeleteTest;
    });
});
