const errors = require("./errors");

const Auditorium = require('../../db/models/auditoriums');
const Presentation = require("../../db/models/presentations");
const Movie = require('../../db/models/movies');

var ObjectID = require('mongodb').ObjectID;

function createPresentation(req, res) {
    Presentation.create(req.body)
        .then(presentation => {
            res.send(presentation);
        })
        .catch(err => errors.databaseError(err, res));
}

function checkAuditorium(auditoriumId, res) {
    return new Promise((resolve, reject) => {
        Auditorium.findOne({'_id': new ObjectID(auditoriumId)})
            .then(auditorium => {
                if (auditorium === null) {
                    reject("auditorium not found")
                } else {
                    resolve("OK");
                }
            })
            .catch(err => errors.databaseError(err, res));
    });

}

function checkMovie(movieId, res) {
    return new Promise((resolve, reject) => {
        Movie.findOne({'_id': new ObjectID(movieId)})
            .then(movie => {
                if (movie === null) {
                    reject("movie not found")
                } else {
                    resolve("OK");
                }
            })
            .catch(err => errors.databaseError(err, res));
    });
}

module.exports.create = (req, res) => {
    checkMovie(req.body.movie, res)
        .then(message => {
            checkAuditorium(req.body.auditorium, res)
                .then(message => {
                    createPresentation(req, res)
                })
                .catch(err => {
                    if (err === "auditorium not found")
                        errors.auditoriumNotFound(res);
                    else
                        return (err)
                })
        })
        .catch(err => {
            if (err === "movie not found")
                errors.movieNotFound(res);
            return (err)
        })
};


module.exports.get = (req, res) => {
    Presentation.find(req.query)
        .then(presentation => res.send(presentation))
        .catch(err => errors.databaseError(err, res))
};

function thereIsNoPresentation(presentation) {
    if (Array.isArray(presentation))
        return presentation.length === 0;
    else
        return presentation === null;
}

module.exports.getById = (req, res) => {
    const id = req.params.id;
    const id_filter = {'_id': new ObjectID(id)};

    Presentation.find(id_filter)
        .then(presentation => {
            if (thereIsNoPresentation(presentation)) {
                errors.presentationNotFound(res);
            } else {
                res.send(presentation);
            }
        })
        .catch(err => errors.databaseError(err, res))
};

function updatePresentation(req, res) {
    const id_filter = {'_id': new ObjectID(req.params.id)};
    const setToReturnUpdatedValue = {new: true};
    const parametersToSet = {$set: req.body};

    Presentation.findOneAndUpdate(
        id_filter,
        parametersToSet,
        setToReturnUpdatedValue,
    )
        .then(presentation => {
            if (thereIsNoPresentation(presentation)) {
                errors.presentationNotFound(res);
            } else {
                res.send();
            }
        })
        .catch(err => errors.databaseError(err, res));
}

module.exports.putById = (req, res) => {

    checkMovie(req.body.movie, res)
        .then(message => {
            checkAuditorium(req.body.auditorium, res)
                .then(message => {
                    updatePresentation(req, res);
                })
                .catch(err => {
                    if (err === "auditorium not found")
                        errors.auditoriumNotFound(res);
                    else
                        return (err)
                })
        })
        .catch(err => {
            if (err === "movie not found")
                errors.movieNotFound(res);
            return (err)
        })
};

module.exports.deleteById = (req, res) => {
    const id_filter = {'_id': new ObjectID(req.params.id)};
    Presentation.find(id_filter)
        .then(presentations => {
            if (thereIsNoPresentation(presentations)) {
                errors.presentationNotFound(res);
            } else {
                deletePresentationById(id_filter, res);
            }
        })
        .catch(err => errors.databaseError(err, res))
};

function deletePresentationById(id_filter, res) {
    Presentation.findOneAndDelete(id_filter)
        .then(presentation => {
            res.status(204);
            res.send({});
        })
        .catch(err => errors.databaseError(err, res))
}
