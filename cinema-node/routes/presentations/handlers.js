const errors = require("./errors");

const Auditorium = require('../../db/models/auditoriums');
const Presentation = require("../../db/models/presentations");


var ObjectID = require('mongodb').ObjectID;
const Tools = require('./tools');

module.exports.create = (req, res) => {
    Tools.checkMovie(req.body.movie, res)
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
            if (err.message === "movie not found")
                errors.movieNotFound(res);
            else
                errors.databaseError(err, res);
            return (err)
        });
};

module.exports.get = (req, res) => {
    const filter = getFilterFromQuery(req);
    Presentation.aggregate([
        {$match: filter},
        {
            $lookup: {
                from: "tickets",
                localField: "_id",
                foreignField: "presentation",
                as: "ticketsSoldArray"
            }
        },
        {
            $addFields: {
                soldTickets: {
                    $size: {
                        $filter: {
                            input: "$ticketsSoldArray",
                            as: "ticket",
                            cond: {$eq: ["$$ticket.sold", true]}
                        }
                    }
                },
                reservedTickets: {
                    $size: {
                        $filter: {
                            input: "$ticketsSoldArray",
                            as: "ticket",
                            cond: {$eq: ["$$ticket.sold", false]}
                        }
                    }
                },
            }
        },
        {$project: {ticketsSoldArray: 0}}
    ])
        .then(presentation => res.send(presentation))
        .catch(err => errors.databaseError(err, res));
};

module.exports.getById = (req, res) => {
    const id = req.params.id;
    const id_filter = {'_id': new ObjectID(id)};
    
    Presentation.aggregate([
        {$match: id_filter},
        {
            $lookup: {
                from: "tickets",
                localField: "_id",
                foreignField: "presentation",
                as: "ticketsSoldArray"
            }
        },
        {
            $addFields: {
                soldTickets: {
                    $size: {
                        $filter: {
                            input: "$ticketsSoldArray",
                            as: "ticket",
                            cond: {$eq: ["$$ticket.sold", true]}
                        }
                    }
                },
                reservedTickets: {
                    $size: {
                        $filter: {
                            input: "$ticketsSoldArray",
                            as: "ticket",
                            cond: {$eq: ["$$ticket.sold", false]}
                        }
                    }
                },
            }
        },
        {$project: {ticketsSoldArray: 0}}
    ])
        .then(presentation => {
            if (thereIsNoPresentation(presentation)) {
                errors.presentationNotFound(res);
            } else {
                res.send(presentation);
            }
        })
        .catch(err => errors.databaseError(err, res))
};

module.exports.putById = (req, res) => {

    Tools.checkMovie(req.body.movie, res)
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
            if (err.name === "movie not found")
                errors.movieNotFound(res);
            else
                errors.databaseError(err, res);
            return (err)
        });
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

function createPresentation(req, res) {
    let newPresentation = req.body;
    Presentation.create(newPresentation)
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

function getFilterFromQuery(req) {
    if (req.query.movie !== undefined) {
        req.query.movie = ObjectID(req.query.movie);
    }
    if (req.query.auditorium !== undefined) {
        req.query.auditorium = ObjectID(req.query.auditorium);
    }
    return req.query;
}

function thereIsNoPresentation(presentation) {
    if (Array.isArray(presentation))
        return presentation.length === 0;
    else
        return presentation === null;
}

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

function deletePresentationById(id_filter, res) {
    Presentation.findOneAndDelete(id_filter)
        .then(presentation => {
            res.status(204);
            res.send({});
        })
        .catch(err => errors.databaseError(err, res))
}
