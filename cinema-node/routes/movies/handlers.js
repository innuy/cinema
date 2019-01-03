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

module.exports.putById = (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    Movie.findOneAndUpdate(
        details,
        { $set: req.body},
        { new: true },
    )
    .then(movie => res.send(movie))
    .catch(err => res.send(err))
};

module.exports.deleteById = (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    Movie.find(details)
        .then(movies =>{
            if (movies.length >0){
                Movie.findOneAndDelete(details)
                    .then(movie => {
                        res.status(204);
                        res.send({});
                    })
                    .catch(err => res.send(err))
            }
            else{
                res.status(404);
                res.send({});
            }
        })
        .catch(err => res.send(err))
};
