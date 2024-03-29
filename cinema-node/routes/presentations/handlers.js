const errors = require("./errors");

const Auditorium = require('../../db/models/auditoriums');
const Presentation = require("../../db/models/presentations");
const Ticket = require("../../db/models/tickets");
const auth = require('../../middlewares/auth');

var ObjectID = require('mongodb').ObjectID;
const Tools = require('./tools');
const soldTicketsSubQuery = {
    $size: {
        $filter: {
            input: "$ticketsSoldArray",
            as: "ticket",
            cond: {$eq: ["$$ticket.sold", true]}
        }
    }
};
const reservedTicketsSubQuery = {
    $size: {
        $filter: {
            input: "$ticketsSoldArray",
            as: "ticket",
            cond: {$eq: ["$$ticket.sold", false]}
        }
    }
};
const getAuditoriumDetailsSubQuery = {
    $lookup: {
        from: "auditoria",
        localField: "auditorium",
        foreignField: "_id",
        as: "auditorium"
    }
};

module.exports.create = (req, res) => {
    Tools.checkMovie(req.body.movie)
        .then(movie => {
            return checkAuditorium(req.body.auditorium);
        })
        .then(auditorium => {
            return createPresentation(req.body);
        })
        .then(presentation => {
            res.send(presentation);
        })
        .catch(err => {
            if (err instanceof Function) {
                err(res);
            } else {
                errors.databaseError(err, res);
            }
        });
};

module.exports.get = (req, res) => {
    const filter = getFilter(req);
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
                soldTickets: soldTicketsSubQuery,
                reservedTickets: reservedTicketsSubQuery,
            }
        },
        {$project: {ticketsSoldArray: 0}},
        getAuditoriumDetailsSubQuery,
        {$sort: {movie: 1, start: -1}}
    ])
        .then(presentation => res.send(presentation))
        .catch(err => errors.databaseError(err, res));
};

module.exports.getById = (req, res) => {
    const id_filter = {'_id': new ObjectID(req.params.id)};

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
                soldTickets: soldTicketsSubQuery,
                reservedTickets: reservedTicketsSubQuery,
            }
        },
        {$project: {ticketsSoldArray: 0}},
        getAuditoriumDetailsSubQuery
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

    Tools.checkMovie(req.body.movie)
        .then(movie => {
            return checkAuditorium(req.body.auditorium)
        })
        .then(auditorium => {
            return updatePresentation(req);
        })
        .then(presentation => {
            res.send();
        })
        .catch(err => {
            if (err instanceof Function) {
                err(res);
            } else {
                errors.databaseError(err, res);
            }
        });
};

module.exports.deleteById = (req, res) => {
    checkPresentation(req.params.id)
        .then(presentation => {
            return Promise.all([
                deletePresentationById(req.params.id),
                deleteTicketWithFilter(req.params.id),
            ])

        })
        .then(presentation => {
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


const checkAuditorium = auditoriumId => new Promise((resolve, reject) => {
    Auditorium.findOne({'_id': new ObjectID(auditoriumId)})
        .then(auditorium => {
            if (auditorium === null) {
                reject(errors.auditoriumNotFound)
            } else {
                resolve(auditorium);
            }
        })
        .catch(err => reject(err));
});

const createPresentation = newPresentation => new Promise((resolve, reject) => {
    Presentation.create(newPresentation)
        .then(presentation => {
            resolve(presentation);
        })
        .catch(err => reject(err));
});

const getFilter = req => {
    const query = req.query;
    if (query.movie !== undefined) {
        query.movie = ObjectID(query.movie);
    }
    if (query.auditorium !== undefined) {
        query.auditorium = ObjectID(query.auditorium);
    }

    const userLogged = req.requestingUser;
    if (isNotLogAsAdmin(userLogged)) {
        const now = new Date();
        query.start = {$gte: now};
    }
    return query;
};

const isNotLogAsAdmin = userLogged => {
    if (userLogged === undefined)
        return true;
    else
        return userLogged.role !== auth.adminRoleKey;
};


const thereIsNoPresentation = presentation => {
    if (Array.isArray(presentation))
        return presentation.length === 0;
    else
        return presentation === null;
};

const updatePresentation = req => new Promise((resolve, reject) => {
    const parametersToSet = {$set: req.body};
    Presentation.findByIdAndUpdate(
        req.params.id,
        parametersToSet,
    )
        .then(presentation => {
            if (thereIsNoPresentation(presentation)) {
                reject(errors.presentationNotFound);
            } else {
                resolve(presentation);
            }
        })
        .catch(err => reject(err));
});

const checkPresentation = id => new Promise((resolve, reject) => {
    Presentation.findById(id)
        .then(presentation => {
            if (thereIsNoPresentation(presentation)) {
                reject(errors.presentationNotFound);
            } else {
                resolve(presentation)
            }
        })
        .catch(err => reject(err))
});

const deletePresentationById = id => new Promise((resolve, reject) => {
    const filter = {'_id': new ObjectID(id)};
    Presentation.findOneAndDelete(filter)
        .then(dbResponse => {
            resolve(dbResponse);
        })
        .catch(err => reject(err))
});

const deleteTicketWithFilter = id => new Promise((resolve, reject) => {
    const filter = {'presentation': new ObjectID(id)};
    Ticket.deleteMany(filter)
        .then(dbResponse => {
            resolve(dbResponse);
        })
        .catch(err => reject(err));
});
