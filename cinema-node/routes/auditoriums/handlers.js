const errors = require("./errors");
const Auditorium = require('../../db/models/auditoriums');
const Seat = require('../../db/models/seats');
const Presentation = require("../../db/models/presentations");
const Ticket = require("../../db/models/tickets");
var ObjectID = require('mongodb').ObjectID;

module.exports.create = (req, res) => {
    Auditorium.create(req.body)
        .then(async auditorium => {
            const seats = await createSeats(auditorium);
            res.send(auditorium)
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
    Auditorium.find(req.query)
        .sort([['number', 'ascending']])
        .then(auditorium => res.send(auditorium))
        .catch(err => errors.databaseError(err, res))
};

module.exports.getById = (req, res) => {
    const id = req.params.id;

    Auditorium.findById(id)
        .then(auditorium => {
            if (thereIsNoAuditorium(auditorium)) {
                errors.auditoriumNotFound(res);
            } else {
                res.send(auditorium);
            }
        })
        .catch(err => errors.databaseError(err, res))
};

module.exports.putById = (req, res) => {
    const id = req.params.id;
    const newAuditorium = req.body;

    getAuditorium(id)
        .then(currentAuditorium => {
            if (auditoriumSizeUpdated(currentAuditorium, newAuditorium)) {
                throw(errors.auditoriumChangingSize);
            } else {
                return updateAuditoriumDocument(id, newAuditorium);
            }
        })
        .then(newAuditorium => {
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
    const id = req.params.id;
    getAuditorium(id)
        .then(async currentAuditorium => {
            const auditoriumFilter = {auditorium: id};
            const presentationList = await getPresentationListWithFilter(auditoriumFilter);
            return Promise.all([
                deleteAuditoriumById(id),
                deleteSeatByAuditoriumId(id),
                deletePresentationsAndRelatedTickets(presentationList),
            ]);
        })
        .then(dbResponse => {
            console.log(dbResponse);
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

const createSeats = auditorium => new Promise((resolve, reject) => {
    const startingInOne = 1;
    let seat = {auditorium: auditorium._id};

    const seatArray = [];

    for (let row = 0; row < auditorium.seatRows; row++) {
        for (let column = 0; column < auditorium.seatColumns; column++) {
            seat.row = row + startingInOne;
            seat.column = column + startingInOne;
            Seat.create(seat)
                .then(seat => {
                    seatArray.push(seat);
                })
                .catch(err => {
                    deleteAuditoriumById(auditorium._id);
                    reject(err);    //TODO delete already created seats
                });
        }
    }
    resolve(seatArray);
});

const getAuditorium = id => new Promise((resolve, reject) => {
    const idFilter = {'_id': new ObjectID(id)};
    Auditorium.findOne(idFilter)
        .then(currentAuditorium => {
            if (thereIsNoAuditorium(currentAuditorium)) {
                reject(errors.auditoriumNotFound);
            } else {
                resolve(currentAuditorium);
            }
        })
        .catch(err => reject(err));
});

const thereIsNoAuditorium = auditorium => {
    if (Array.isArray(auditorium))
        return auditorium.length === 0;
    else
        return auditorium === null;
};

const auditoriumSizeUpdated = (auditorium, newAuditorium) => (auditorium.seatRows !== newAuditorium.seatRows) ||
    (auditorium.seatColumns !== newAuditorium.seatColumns);

const updateAuditoriumDocument = (id, newAuditorium) => new Promise((resolve, reject) => {
    const parametersToSet = {$set: newAuditorium};
    Auditorium.findByIdAndUpdate(
        id,
        parametersToSet,
    )
        .then(auditorium => {
            if (thereIsNoAuditorium(auditorium)) {
                reject(errors.auditoriumNotFound);
            } else {
                resolve(auditorium);
            }
        })
        .catch(err => reject(err))
});

const deleteAuditoriumById = id => new Promise((resolve, reject) => {
    const idFilter = {'_id': new ObjectID(id)};
    Auditorium.findOneAndDelete(idFilter)
        .then(dbResponse => {
            resolve(dbResponse);
        })
        .catch(err => reject(err));
});

const deleteSeatByAuditoriumId = id => new Promise((resolve, reject) => {
    const auditoriumIdFilter = {auditorium: id};
    Seat.deleteMany(auditoriumIdFilter)
        .then(dbResponse => {
            resolve(dbResponse);
        })
        .catch(err => reject(err));
});

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
        const presentationFilter = {'_id': new ObjectID(presentation._id)};
        deleteTicketPromiseArray.push(deletePresentationsWithFilter(presentationFilter));
        const ticketFilter = {presentation: presentation._id};
        deleteTicketPromiseArray.push(deleteTicketWithFilter(ticketFilter));
    });

    return Promise.all(deleteTicketPromiseArray);
};
