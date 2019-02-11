const errors = require("./errors");
const Movie = require('../../db/models/movies');

module.exports.checkMovie = movieId => new Promise((resolve, reject) => {
    Movie.findById(movieId)
        .then(movie => {
            if (movie === null) {
                reject(errors.movieNotFound)
            } else {
                resolve(movie);
            }
        })
        .catch(err => reject(err));
});
