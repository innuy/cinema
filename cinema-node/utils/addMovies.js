let app = require('../app');
const request = require('supertest');
const Movie = require("../../cinema-node/db/models/movies");

const theShawshankRedemption = {
    name: "The Shawshank Redemption",
    image: "image link",
    duration: "2h22min",
    actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    summary: "Two imprisoned men bond over a number of years, " +
        "finding solace and eventual redemption through acts of common decency.",
    director: "Frank Darabont"
};
const theGodfather = {
    name: "The Godfather",
    image: "image link",
    duration: "2h55min",
    actors: ["Marlon Brando", "Al Pacino", "James Caan"],
    summary: "The aging patriarch of an organized crime dynasty transfers control " +
        "of his clandestine empire to his reluctant son.",
    director: "Francis Ford Coppola"
};
const theGodfatherII = {
    name: "The Godfather: Part II",
    image: "image link",
    duration: "3h22min",
    actors: ["Al Pacino", "Robert De Niro", "Robert Duvall"],
    summary: "The early life and career of Vito Corleone in 1920s New York City is portrayed," +
        " while his son, Michael, expands and tightens his grip on the family crime syndicate.",
    director: "Francis Ford Coppola"
};
const theDarkKnight = {
    name: "The Dark Knight",
    image: "image link",
    duration: "2h32min",
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    summary: "When the menace known as the Joker emerges from his mysterious past, " +
        "he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest " +
        "psychological and physical tests of his ability to fight injustice.",
    director: "Christopher Nolan"
};

const twelveAngryMen = {
    name: "12 Angry Men",
    image: "image link",
    duration: "1h36min",
    actors: ["Henry Fonda", "Lee J. Cobb", "Martin Balsam"],
    summary: "A jury holdout attempts to prevent a miscarriage of justice" +
        " by forcing his colleagues to reconsider the evidence.",
    director: "Sidney Lumet"
};


const moviePostTest = async () => {
    const top5IMDbMovies = [
        theShawshankRedemption,
        theGodfather,
        theGodfatherII,
        theDarkKnight,
        twelveAngryMen,
    ];
    console.log('hola');
    top5IMDbMovies.forEach(async movie => {

        Movie.create(movie)
            .then(movieCreated => console.log('Succesfuly created ' + movieCreated.name))
            .catch(err => errors.databaseError(undefined, err));
    });
};

moviePostTest();