
const errors = require("./errors");
const Auditorium = require('../../db/models/auditoriums');
const Seat = require('../../db/models/seats');

module.exports.create = (req, res) => {
    Auditorium.create(req.body)
        .then(auditorium => {
            const startingInOne = 1;
            let seat={
                auditorium: auditorium._id
            };

            for (let row = 0; row < req.body.seatRows; row++) {
                for (let column = 0; column < req.body.seatColumns; column++) {
                    seat.row = row + startingInOne;
                    seat.column = column+ startingInOne;
                    Seat.create(seat);
                }
            }
            res.send(auditorium)
        })
        .catch(err => errors.databaseError(err, res))
};
