const errors = require("./errors");

const Movie = require('../../db/models/movies');
const Presentation = require("../../db/models/presentations");
const Ticket = require("../../db/models/tickets");

var ObjectID = require('mongodb').ObjectID;

const upload = require('../../utils/fileUpload');
const singleUpload = upload.single('image');

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
    const movieId = req.params.id;
    ifMovieExists(movieId)
        .then(async movies => {
            const movieFilter = {movie: movieId};
            const presentationList = await getPresentationListWithFilter(movieFilter);
            return Promise.all([
                deleteMovieById(movieId),
                deletePresentationsAndRelatedTickets(presentationList),
            ]);
        })
        .then(movie => {
            res.status(204);
            res.send({});
        })
        .catch(err => {
            if (err instanceof Function) {
                err(res);
            } else {
                errors.databaseError(err, res);
            }
        });
};

module.exports.imageUpload = (req, res) => {
    singleUpload(req, res, function (err, some) {
        if (err) {
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }

        return res.json({'imageUrl': req.file.location});
    });
};

module.exports.movieImageUpload = (req, res) => {
    const id = req.params.id;

    singleUploadPromise(req, res)
        .then(imageUrl => {
            getMovie(id)
                .then(movie => {
                    return addImageLinkInMovie(id, imageUrl);
                })
                .then(movie => {
                    res.send(movie);
                })
                .catch(err => {
                    if (err instanceof Function) {
                        err(res);
                    } else {
                        errors.databaseError(err, res);
                    }
                });

        })
        .catch(err => {
            if (err instanceof Function) {
                err(res);
            } else {
                errors.imageUploadError(err, res);
            }
        });
};

const ifMovieExists = movieId => new Promise((resolve, reject) => {
    const id_filter = {'_id': new ObjectID(movieId)};
    Movie.find(id_filter)
        .then(movies => {
            if (thereIsNoMovie(movies)) {
                reject(errors.movieNotFound);
            } else {
                resolve(movies);
            }
        });
});

const deleteMovieById = movieId => new Promise((resolve, reject) => {
    const id_filter = {'_id': new ObjectID(movieId)};
    Movie.findOneAndDelete(id_filter)
        .then(movie => {
            resolve(movie);
        })
        .catch(err => reject(err))
});

const thereIsNoMovie = movie => {
    if (Array.isArray(movie))
        return movie.length === 0;
    else
        return movie === null;
};

const getPresentationListWithFilter = filter => new Promise((resolve, reject) => {
    Presentation.find(filter)
        .then(presentations => {
            if (presentations === null) {
                reject(errors.presentationNotFound);
            } else {
                resolve(presentations);
            }
        })
        .catch(err => {
            reject(err)
        });
});

const deletePresentationsWithFilter = filter => new Promise((resolve, reject) => {
    Presentation.deleteMany(filter)
        .then(dbResponse => {
            resolve(dbResponse);
        })
        .catch(err => {
            reject(err)
        });
});

const deleteTicketWithFilter = filter => new Promise((resolve, reject) => {
    Ticket.deleteMany(filter)
        .then(dbResponse => {
            resolve(dbResponse);
        })
        .catch(err => reject(err));
});

const deletePresentationsAndRelatedTickets = presentationsList => {
    const deleteTicketPromiseArray = [];

    presentationsList.forEach(presentation => {
        const ticketFilter = {presentation: presentation._id};
        const presentationFilter = {'_id': new ObjectID(presentation._id)};
        deleteTicketPromiseArray.push(deleteTicketWithFilter(ticketFilter));
        deleteTicketPromiseArray.push(deletePresentationsWithFilter(presentationFilter));
    });

    return Promise.all(deleteTicketPromiseArray);
};

const singleUploadPromise = (req, res) => new Promise((resolve, reject) => {
    singleUpload(req, res, function (err, some) {
        if (err) {
            reject(err);
        } else {
            const imageUrl = req.file.location;
            resolve(imageUrl)
        }
    });
});

const getMovie = id => new Promise((resolve, reject) => {
    Movie.findById(id)
        .then(movie => {
            if (thereIsNoMovie(movie)) {
                reject(errors.movieNotFound);
            } else {
                resolve(movie)
            }
        })
        .catch(err => reject(err));
});

const addImageLinkInMovie = (id, imageUrl) => new Promise((resolve, reject) => {
    const id_filter = {'_id': new ObjectID(id)};
    const setToReturnUpdatedValue = {new: true};
    const parametersToSet = {$set: {image: imageUrl}};

    Movie.findOneAndUpdate(
        id_filter,
        parametersToSet,
        setToReturnUpdatedValue,
    )
        .then(movie => {
            if (thereIsNoMovie(movie)) {
                reject(errors.movieNotFound);
            } else {
                resolve(movie)
            }
        })
        .catch(err => reject(err));
});
