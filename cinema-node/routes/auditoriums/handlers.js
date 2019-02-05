const errors = require("./errors");
const Auditorium = require('../../db/models/auditoriums');
const Seat = require('../../db/models/seats');
var ObjectID = require('mongodb').ObjectID;

module.exports.create = (req, res) => {
    Auditorium.create(req.body)
        .then(async auditorium => {
            const seats = await createSeats(auditorium, req);
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

const createSeats = (auditorium, req) => new Promise((resolve, reject) => {
    const startingInOne = 1;
    let seat = {auditorium: auditorium._id};
    const seatArray = [];

    for (let row = 0; row < req.body.seatRows; row++) {
        for (let column = 0; column < req.body.seatColumns; column++) {
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

module.exports.get = (req, res) => {
    Auditorium.find(req.query)
        .then(auditorium => res.send(auditorium))
        .catch(err => errors.databaseError(err, res))
};

module.exports.getById = (req, res) => {
    const id = req.params.id;
    const idFilter = {'_id': new ObjectID(id)};
    Auditorium.findById(req.params.id)
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

    checkAuditorium(id, newAuditorium)
        .then(currentAuditorium => {
            return updateAuditoriumDocument(id, newAuditorium);
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

function checkAuditorium(id, newAuditorium) {
    return new Promise((resolve, reject) => {
        const idFilter = {'_id': new ObjectID(id)};
        Auditorium.findOne(idFilter)
            .then(currentAuditorium => {
                if (thereIsNoAuditorium(currentAuditorium)) {
                    reject(errors.auditoriumNotFound);
                } else {
                    if (auditoriumSizeUpdated(currentAuditorium, newAuditorium)) {
                        reject(errors.auditoriumChangingSize);
                    } else {
                        resolve(currentAuditorium);
                    }
                }
            })
            .catch(err => reject(err));
    });
}

function thereIsNoAuditorium(auditorium) {
    if (Array.isArray(auditorium))
        return auditorium.length === 0;
    else
        return auditorium === null;
}

function auditoriumSizeUpdated(auditorium, newAuditorium) {
    return (auditorium.seatRows !== newAuditorium.seatRows) ||
        (auditorium.seatColumns !== newAuditorium.seatColumns);
}

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

module.exports.deleteById = (req, res) => {
    const idFilter = {'_id': new ObjectID(req.params.id)};
    Auditorium.find(idFilter)
        .then(auditoriums => {
            if (thereIsNoAuditorium(auditoriums)) {
                errors.auditoriumNotFound(res);
            } else {
                deleteAuditoriumById(idFilter, res);
            }
        })
        .catch(err => errors.databaseError(err, res))
};

function deleteAuditoriumById(idFilter, res) {
    Seat.deleteMany({auditorium: idFilter._id})
        .catch(err => errors.databaseError(err, res));

    Auditorium.findOneAndDelete(idFilter)
        .then(dbresponse => {
            res.status(204);
            res.send({});
        })
        .catch(err => errors.databaseError(err, res));
}