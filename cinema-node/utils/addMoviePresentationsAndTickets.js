let app = require('../app');
const request = require('supertest');
const Movie = require("../../cinema-node/db/models/movies");
const Presentation = require("../../cinema-node/db/models/presentations");
const Ticket = require("../../cinema-node/db/models/tickets");

const auditoriumId = "5c5c6f45bcc3f94719802796";
const seatId = "5c37ac1e638afe1e734f9d17";

const theGodfather = {
    name: "Test Movie",
    duration: "2h55min",
    actors: ["Test Movie", "Test Movie", "Test Movie"],
    summary: "Test Movie",
    director: "Test Movie"
};

const presentationsPerMovie = 3;
const ticketsPerPresentation = 3;

const moviePostTest = async () => {
    console.log('Add movie:');

    createMovie(theGodfather)
        .then(async movieCreated => {
            const presentationFilter = {
                movie: movieCreated._id,
                auditorium: auditoriumId,
                start: "2019-02-08T20:00:00+00:00"
            };
            for (let i = 0; i < presentationsPerMovie; i++) {
                const presentation = await createPresentation(presentationFilter);
                for (let j = 0; j < ticketsPerPresentation; j++) {
                    const ticket = {
                        presentation: presentation._id,
                        seat: seatId,
                        sold: false,
                    };
                    await createTicket(ticket);
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
};
const createMovie = (movie) => new Promise((resolve, reject) => {
    Movie.create(movie)
        .then(movieCreated => {
            console.log('Succesfully created ' + movieCreated.name + " with id:" + movieCreated._id);
            resolve(movieCreated);
        })
        .catch(err => reject(err));
});

const createPresentation = (presentation) => new Promise((resolve, reject) => {
    Presentation.create(presentation)
        .then(presentationCreated => {
            console.log('--Succesfully created presentation at ' + presentationCreated.start + " with id:" + presentationCreated._id);
            resolve(presentationCreated);
        })
        .catch(err => reject(err));
});

const createTicket = (ticket) => new Promise((resolve, reject) => {
    Ticket.create(ticket)
        .then(ticketCreated => {
            console.log(
                '----Succesfully created ticket with id:' + ticketCreated._id
            );
            resolve(ticketCreated);
        })
        .catch(err => reject(err));
});

moviePostTest();
