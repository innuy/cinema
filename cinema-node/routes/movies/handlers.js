const Movie = require('../../db/models/movies');
var ObjectID = require('mongodb').ObjectID;

module.exports.create = (req, res) => {
    Movie.create(req.body)
        .then(movie => res.send('Succesfuly created ' + movie.name))
};

module.exports.get = (req, res) => {
    Movie.find(req.body)
        .then(movie => res.send(movie))
};

module.exports.getById = (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    Movie.find(details)
        .then(movie => res.send(movie))
};