const sinon = require('sinon');
const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require('supertest');
let app;

require('../setup');

const Movie = require("../../../db/models/movies");
const Presentation = require("../../../db/models/presentations");
const Ticket = require("../../../db/models/tickets");

const testingMovieIdToDelete = '5c2e105c8509f424122c4067';
const testingMovieWrongIdToDelete = '000000000000000000000001';
const testingAuditoriumId = '5c34a1ce4150f31a815d41b4';
const testingPresentationIdToSearch = '5c267aa85335a14c175cb0dd';

const date = new Date("August 25, 1825 12:00:00");

const testingMovieData = {
    _id: testingMovieIdToDelete,
    name: "Toy Story",
    image: "image link",
    duration: "1h10m",
    actors: ["Buzz"],
    summary: "Great movie",
    director: "John Lasseter"
};

const testingPresentationAnswerData = {
    _id: testingPresentationIdToSearch,
    movie: testingMovieIdToDelete,
    auditorium: testingAuditoriumId,
    start: date.toISOString(),
};

function movieDeleteTestbyId(done) {
     request(app)
        .del('/movies/' + testingMovieIdToDelete)
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
function movieNotFoundTest(done) {
    request(app)
        .del('/movies/' + testingMovieIdToDelete)
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
function moviePresentationNotFoundTest(done) {
    request(app)
        .del('/movies/' + testingMovieIdToDelete)
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
function movieDbErrorFindingPresentationTest(done) {
    request(app)
        .del('/movies/' + testingMovieIdToDelete)
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
function movieDbErrorDeletingMovieTest(done) {
    request(app)
        .del('/movies/' + testingMovieIdToDelete)
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
function movieDbErrorDeletingTicketsTest(done) {
    request(app)
        .del('/movies/' + testingMovieIdToDelete)
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
function movieDbErrorDeletingPresentationTest(done) {
    request(app)
        .del('/movies/' + testingMovieIdToDelete)
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
function movieWrongIdDeleteTest(done) {
    request(app)
        .del('/movies/' + testingMovieWrongIdToDelete)
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


describe("Movie Delete by id test", async function () {
    beforeEach(() => {
        app = require('../../../app');
    });

    afterEach(() => {
        Movie.find.restore();
        Presentation.find.restore();
        Movie.findOneAndDelete.restore();
        Ticket.deleteMany.restore();
        Presentation.deleteMany.restore();
    });

    it('Successful - Delete movie', (done) => {
        sinon.stub(Movie, 'find').resolves([testingMovieData]);
        sinon.stub(Presentation, 'find').resolves([testingPresentationAnswerData]);
        sinon.stub(Movie, 'findOneAndDelete').resolves();
        sinon.stub(Ticket, 'deleteMany').resolves();
        sinon.stub(Presentation, 'deleteMany').resolves();
        movieDeleteTestbyId(done);
    });
    it('Failed - Movie not found', (done) => {
        sinon.stub(Movie, 'find').resolves(null);
        sinon.stub(Presentation, 'find').resolves();
        sinon.stub(Movie, 'findOneAndDelete').rejects();
        sinon.stub(Ticket, 'deleteMany').resolves();
        sinon.stub(Presentation, 'deleteMany').resolves();
        movieNotFoundTest(done);
    });
    it('Failed - Presentations not found', (done) => {
        sinon.stub(Movie, 'find').resolves([testingMovieData]);
        sinon.stub(Presentation, 'find').resolves(null);
        sinon.stub(Movie, 'findOneAndDelete').rejects();
        sinon.stub(Ticket, 'deleteMany').resolves();
        sinon.stub(Presentation, 'deleteMany').resolves();
        moviePresentationNotFoundTest(done);
    });
    it('Failed - Db error finding presentations', (done) => {
        sinon.stub(Movie, 'find').resolves([testingMovieData]);
        sinon.stub(Presentation, 'find').rejects(Error("DB error"));
        sinon.stub(Movie, 'findOneAndDelete').rejects();
        sinon.stub(Ticket, 'deleteMany').resolves();
        sinon.stub(Presentation, 'deleteMany').resolves();
        movieDbErrorFindingPresentationTest(done);
    });
    it('Failed - Db error deleting movie', (done) => {
        sinon.stub(Movie, 'find').resolves([testingMovieData]);
        sinon.stub(Presentation, 'find').resolves([testingPresentationAnswerData]);
        sinon.stub(Movie, 'findOneAndDelete').rejects(Error("DB error"));
        sinon.stub(Ticket, 'deleteMany').resolves();
        sinon.stub(Presentation, 'deleteMany').resolves();
        movieDbErrorDeletingMovieTest(done);
    });
    it('Failed - Db error deleting tickets', (done) => {
        sinon.stub(Movie, 'find').resolves([testingMovieData]);
        sinon.stub(Presentation, 'find').resolves([testingPresentationAnswerData]);
        sinon.stub(Movie, 'findOneAndDelete').resolves();
        sinon.stub(Ticket, 'deleteMany').rejects(Error("DB error"));
        sinon.stub(Presentation, 'deleteMany').resolves();
        movieDbErrorDeletingTicketsTest(done);
    });
    it('Failed - Db error deleting presentation', (done) => {
        sinon.stub(Movie, 'find').resolves([testingMovieData]);
        sinon.stub(Presentation, 'find').resolves([testingPresentationAnswerData]);
        sinon.stub(Movie, 'findOneAndDelete').resolves();
        sinon.stub(Ticket, 'deleteMany').resolves();
        sinon.stub(Presentation, 'deleteMany').rejects(null);
        movieDbErrorDeletingPresentationTest(done);
    });
    it('Failed - Wrong id', (done) => {
        sinon.stub(Movie, 'find').resolves(null);
        sinon.stub(Presentation, 'find').resolves(null);
        sinon.stub(Movie, 'findOneAndDelete').resolves(null);
        sinon.stub(Ticket, 'deleteMany').resolves(null);
        sinon.stub(Presentation, 'deleteMany').resolves(null);
        movieWrongIdDeleteTest(done);
    });
});
