const errors = require("./errors");
const Auditorium = require('../../db/models/auditoriums');
const Seat = require('../../db/models/seats');
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
        .then(currentAuditorium => {
            return deleteAuditoriumById(id);
        })
        .then(dbresponse => {
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
    const idFilter = {'_id': new ObjectID(id)};
    const setToReturnUpdatedValue = {new: true};
    const parametersToSet = {$set: newAuditorium};
    Auditorium.findOneAndUpdate(
        idFilter,
        parametersToSet,
        setToReturnUpdatedValue,
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
    Seat.deleteMany({auditorium: id})
        .catch(err => reject(err));

    Auditorium.findOneAndDelete(idFilter)
        .then(dbresponse => {
            resolve(dbresponse);
        })
        .catch(err => reject(err));
});