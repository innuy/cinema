const errors = require("./errors");
const Auditorium = require('../../db/models/auditoriums');
const Seat = require('../../db/models/seats');
var ObjectID = require('mongodb').ObjectID;

module.exports.create = (req, res) => {
    Auditorium.create(req.body)
        .then(auditorium => {
            const startingInOne = 1;
            let seat = {
                auditorium: auditorium._id
            };

            for (let row = 0; row < req.body.seatRows; row++) {
                for (let column = 0; column < req.body.seatColumns; column++) {
                    seat.row = row + startingInOne;
                    seat.column = column + startingInOne;
                    Seat.create(seat);
                }
            }
            res.send(auditorium)
        })
        .catch(err => errors.databaseError(err, res))
};

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
