
const errors = require("./errors");
const Movie = require('../../db/models/movies');
var ObjectID = require('mongodb').ObjectID;

module.exports.create = (req, res) => {
    Movie.create(req.body)
        .then(movie => res.send(movie))
        .catch(err => errors.databaseError(err, res))
};

module.exports.get = (req, res) => {
    Movie.find(req.query)
        .then(movie => res.send(movie))
        .catch(err => errors.databaseError(err, res))
};

module.exports.getById = (req, res) => {
    const id = req.params.id;
    const id_filter = {'_id': new ObjectID(id)};

    Movie.find(id_filter)
        .then(movie => {
            if (thereIsNoMovie(movie)) {
                errors.movieNotFound(res);
            } else {
                res.send(movie);
            }
        })
        .catch(err => errors.databaseError(err, res))
};

module.exports.putById = (req, res) => {
    const id_filter = {'_id': new ObjectID(req.params.id)};
    const setToReturnUpdatedValue = {new: true};
    const parametersToSet = {$set: req.body};

    Movie.findOneAndUpdate(
        id_filter,
        parametersToSet,
        setToReturnUpdatedValue,
    )
        .then(movie => {
            if (thereIsNoMovie(movie)) {
                errors.movieNotFound(res);
            } else {
                res.send();
            }
        })
        .catch(err => errors.databaseError(err, res))
};

module.exports.deleteById = (req, res) => {
    const id_filter = {'_id': new ObjectID(req.params.id)};
    Movie.find(id_filter)
        .then(movies => {
            if (thereIsNoMovie(movies)) {
                errors.movieNotFound(res);
            } else {
                deleteMovieById(id_filter, res);
            }
        })
        .catch(err => errors.databaseError(err, res))
};

function deleteMovieById(id_filter, res) {
    Movie.findOneAndDelete(id_filter)
        .then(movie => {
            res.status(204);
            res.send({});
        })
        .catch(err => errors.databaseError(err, res))
}

function thereIsNoMovie(movie) {
    if ( Array.isArray(movie))
        return movie.length === 0;
    else
        return movie === null;
}