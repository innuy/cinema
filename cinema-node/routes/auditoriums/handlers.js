const errors = require("./errors");
const Auditorium = require('../../db/models/auditoriums');
const Seat = require('../../db/models/seats');
var ObjectID = require('mongodb').ObjectID;

module.exports.create = (req, res) => {
    Auditorium.create(req.body)
        .then(auditorium => {
            createSeats(auditorium, req);
            res.send(auditorium)
        })
        .catch(err => errors.databaseError(err, res))
};

function createSeats(auditorium, req) {
    const startingInOne = 1;
    let seat = {auditorium: auditorium._id};

    for (let row = 0; row < req.body.seatRows; row++) {
        for (let column = 0; column < req.body.seatColumns; column++) {
            seat.row = row + startingInOne;
            seat.column = column + startingInOne;
            Seat.create(seat);
        }
    }
}

module.exports.get = (req, res) => {
    Auditorium.find(req.query)
        .then(auditorium => res.send(auditorium))
        .catch(err => errors.databaseError(err, res))
};

module.exports.getById = (req, res) => {
    const id = req.params.id;
    const idFilter = {'_id': new ObjectID(id)};

    Auditorium.find(idFilter)
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
    const idFilter = {'_id': new ObjectID(req.params.id)};

    Auditorium.findOne(idFilter)
        .then(auditorium => {
            if (thereIsNoAuditorium(auditorium)) {
                errors.auditoriumNotFound(res);
            } else if (auditoriumSizeUpdated(auditorium, req)) {
                errors.auditoriumChangingSize(res);
            } else {
                updateAuditoriumDocument(req, res);
            }
        })
        .catch(err => errors.databaseError(err, res))
};

function auditoriumSizeUpdated(auditorium, req) {
    return (auditorium.seatRows != req.body.seatRows) ||
        (auditorium.seatColumns != req.body.seatColumns);
}

function updateAuditoriumDocument(req, res) {
    const idFilter = {'_id': new ObjectID(req.params.id)};
    const setToReturnUpdatedValue = {new: true};
    const parametersToSet = {$set: req.body};
    Auditorium.findOneAndUpdate(
        idFilter,
        parametersToSet,
        setToReturnUpdatedValue,
    )
        .then(auditorium => {
            if (thereIsNoAuditorium(auditorium)) {
                errors.auditoriumNotFound(res);
            } else {
                res.send();
            }
        })
        .catch(err => errors.databaseError(err, res))
}

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
        .catch(err => errors.databaseError(err, res))

    Auditorium.findOneAndDelete(idFilter)
        .then(dbresponse => {
            res.status(204);
            res.send({});
        })
        .catch(err => errors.databaseError(err, res))

}

function thereIsNoAuditorium(movie) {
    if (Array.isArray(movie))
        return movie.length === 0;
    else
        return movie === null;
}

