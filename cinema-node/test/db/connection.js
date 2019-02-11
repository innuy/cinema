var expect = require("chai").expect;
var mongoose = require('mongoose');
var db = require('../../connectors/mongoDB');
var Movie = require('../../db/models/movies');

describe("Mongo-Mongoose connection test", function () {

    before(async function () {

        require('dotenv').config();
        await db.connectMongo()
            .then(() => {
                const movie = new Movie();
                movie.name = 'a';
                movie.save();
            })
    });

    after(function () {
        Movie.deleteOne({name: 'a'}, function (err) {
        })
    });

    it("Print Mongo uri", function () {
        expect("Go Cinema!!!").to.equal("Go Cinema!!!");
        expect(process.env.DB_USER).to.equal('JPB');
    });

    it("Is connected", function () {
        expect(db.isConnected()).to.equal("connected");
    });

    it("Find a movie element", async function () {
        this.retries(2);
        await Movie.findOne({name: 'a'})
            .then(movie => {
                expect(movie.name).to.equal('a');
            })
            .catch(err => {
                console.log(err);
            })
    });

});