const Movie = require('../../db/models/movies');

module.exports.checkMovie = (movieId, res) => {
    return new Promise((resolve, reject) => {
        Movie.findById(movieId)
            .then(movie => {
                if (movie === null) {
                    reject(Error("movie not found"))
                } else {
                    resolve("OK");
                }
            })
            .catch(err => errors.databaseError(err, res));
    });
};
