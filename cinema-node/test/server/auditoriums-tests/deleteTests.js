const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Auditorium = require("../../../db/models/auditoriums");
const Seat = require('../../../db/models/seats');
const Presentation = require("../../../db/models/presentations");
const Ticket = require("../../../db/models/tickets");

const testingAuditoriumIdToDelete = '5c2e105c8509f424122c4067';
const testingAuditoriumWrongIdToDelete = '000000000000000000000001';
const testingAuditoriumData = {
    number: 2,
    seatRows: 20,
    seatColumns: 10,
};

const testingPresentationIdToSearch = '5c267aa85335a14c175cb0dd';
const testingMovieIdToDelete = '5c2e105c8509f424122c4067';
const testingAuditoriumId = '5c34a1ce4150f31a815d41b4';
const date = new Date("August 25, 1825 12:00:00");

const testingPresentationAnswerData = {
    _id: testingPresentationIdToSearch,
    movie: testingMovieIdToDelete,
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
};

function auditoriumDeleteTestbyId(done) {
    request(app)
        .del('/auditoriums/' + testingAuditoriumIdToDelete)
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
function auditoriumNotFoundTest(done) {
    request(app)
        .del('/auditoriums/' + testingAuditoriumIdToDelete)
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
function auditoriumPresentationNotFoundTest(done) {
    request(app)
        .del('/auditoriums/' + testingAuditoriumIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 412);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}
function auditoriumDbErrorFindingPresentationTest(done) {
    request(app)
        .del('/auditoriums/' + testingAuditoriumIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 500);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}
function auditoriumDbErrorDeletingAuditoriumTest(done) {
    request(app)
        .del('/auditoriums/' + testingAuditoriumIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 500);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}
function auditoriumDbErrorDeletingSeatsTest(done) {
    request(app)
        .del('/auditoriums/' + testingAuditoriumIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 500);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}
function auditoriumDbErrorDeletingTicketsTest(done) {
    request(app)
        .del('/auditoriums/' + testingAuditoriumIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 500);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}
function auditoriumDbErrorDeletingPresentationTest(done) {
    request(app)
        .del('/auditoriums/' + testingAuditoriumIdToDelete)
        .send()
        .then((res) => {
            setTimeout(() => {
                res.should.be.an('object');
                assert.equal(res.status, 500);
            });
            done();
        })
        .catch(err => {
            console.log(err);
        })
}
function auditoriumWrongIdDeleteTest(done) {
    request(app)
        .del('/auditoriums/' + testingAuditoriumWrongIdToDelete)
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

describe("Auditorium Delete by id test", function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Auditorium.findOne.restore();
        Presentation.find.restore();
        Auditorium.findOneAndDelete.restore();
        Seat.deleteMany.restore();
        Ticket.deleteMany.restore();
        Presentation.deleteMany.restore();
    });

    it('Successful - Delete auditorium', (done) => {
        sinon.stub(Auditorium, 'findOne').resolves([testingAuditoriumData]);
        sinon.stub(Presentation, 'find').resolves([testingPresentationAnswerData]);
        sinon.stub(Auditorium, 'findOneAndDelete').resolves();
        sinon.stub(Seat, 'deleteMany').resolves();
        sinon.stub(Ticket, 'deleteMany').resolves();
        sinon.stub(Presentation, 'deleteMany').resolves();
        auditoriumDeleteTestbyId(done);
    });
    it('Failed - Auditorium not found', (done) => {
        sinon.stub(Auditorium, 'findOne').resolves(null);
        sinon.stub(Presentation, 'find').resolves();
        sinon.stub(Auditorium, 'findOneAndDelete').resolves();
        sinon.stub(Seat, 'deleteMany').resolves();
        sinon.stub(Ticket, 'deleteMany').resolves();
        sinon.stub(Presentation, 'deleteMany').resolves();
        auditoriumNotFoundTest(done);
    });
    it('Failed - Presentations not found', (done) => {
        sinon.stub(Auditorium, 'findOne').resolves([testingAuditoriumData]);
        sinon.stub(Presentation, 'find').resolves(null);
        sinon.stub(Auditorium, 'findOneAndDelete').resolves();
        sinon.stub(Seat, 'deleteMany').resolves();
        sinon.stub(Ticket, 'deleteMany').resolves();
        sinon.stub(Presentation, 'deleteMany').resolves();
        auditoriumPresentationNotFoundTest(done);
    });
    it('Failed - Db error finding presentations', (done) => {
        sinon.stub(Auditorium, 'findOne').resolves([testingAuditoriumData]);
        sinon.stub(Presentation, 'find').rejects(Error("DB error"));
        sinon.stub(Auditorium, 'findOneAndDelete').resolves();
        sinon.stub(Seat, 'deleteMany').resolves();
        sinon.stub(Ticket, 'deleteMany').resolves();
        sinon.stub(Presentation, 'deleteMany').resolves();
        auditoriumDbErrorFindingPresentationTest(done);
    });
    it('Failed - Db error deleting auditorium', (done) => {
        sinon.stub(Auditorium, 'findOne').resolves([testingAuditoriumData]);
        sinon.stub(Presentation, 'find').resolves([testingPresentationAnswerData]);
        sinon.stub(Auditorium, 'findOneAndDelete').rejects(Error("DB error"));
        sinon.stub(Seat, 'deleteMany').resolves();
        sinon.stub(Ticket, 'deleteMany').resolves();
        sinon.stub(Presentation, 'deleteMany').resolves();
        auditoriumDbErrorDeletingAuditoriumTest(done);
    });
    it('Failed - Db error deleting seats', (done) => {
        sinon.stub(Auditorium, 'findOne').resolves([testingAuditoriumData]);
        sinon.stub(Presentation, 'find').resolves([testingPresentationAnswerData]);
        sinon.stub(Auditorium, 'findOneAndDelete').resolves();
        sinon.stub(Seat, 'deleteMany').rejects(Error("DB error"));
        sinon.stub(Ticket, 'deleteMany').resolves();
        sinon.stub(Presentation, 'deleteMany').resolves();
        auditoriumDbErrorDeletingSeatsTest(done);
    });
    it('Failed - Db error deleting tickets', (done) => {
        sinon.stub(Auditorium, 'findOne').resolves([testingAuditoriumData]);
        sinon.stub(Presentation, 'find').resolves([testingPresentationAnswerData]);
        sinon.stub(Auditorium, 'findOneAndDelete').resolves();
        sinon.stub(Seat, 'deleteMany').resolves();
        sinon.stub(Ticket, 'deleteMany').rejects(Error("DB error"));
        sinon.stub(Presentation, 'deleteMany').resolves();
        auditoriumDbErrorDeletingTicketsTest(done);
    });
    it('Failed - Db error deleting presentation', (done) => {
        sinon.stub(Auditorium, 'findOne').resolves([testingAuditoriumData]);
        sinon.stub(Presentation, 'find').resolves([testingPresentationAnswerData]);
        sinon.stub(Auditorium, 'findOneAndDelete').resolves();
        sinon.stub(Seat, 'deleteMany').resolves();
        sinon.stub(Ticket, 'deleteMany').resolves();
        sinon.stub(Presentation, 'deleteMany').rejects(null);
        auditoriumDbErrorDeletingPresentationTest(done);
    });
    it('Failed - Wrong id', (done) => {
        sinon.stub(Auditorium, 'findOne').resolves(null);
        sinon.stub(Presentation, 'find').resolves([testingPresentationAnswerData]);
        sinon.stub(Auditorium, 'findOneAndDelete').resolves(null);
        sinon.stub(Seat, 'deleteMany').resolves(null);
        sinon.stub(Ticket, 'deleteMany').resolves(null);
        sinon.stub(Presentation, 'deleteMany').resolves(null);
        auditoriumWrongIdDeleteTest(done);
    });
});
