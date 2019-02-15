const errors = require("./errors");

const Movie = require('../../db/models/movies');
const Presentation = require("../../db/models/presentations");
const Ticket = require("../../db/models/tickets");

var ObjectID = require('mongodb').ObjectID;


module.exports.getTopMovies = (req, res) => {
    let amount = req.query.amount;
    let getGreaterThanXDaysAgoIdFilter = {_id: {$gt: objectIdWithTimestamp(getDateXDaysAgo(30))}};
    Ticket.aggregate([
        {$match: getGreaterThanXDaysAgoIdFilter},
        {
            $group: {
                _id: {
                    presentation: "$presentation",
                },
                count: {$sum: 1}
            }
        },
        {
            $lookup: {
                from: "presentations",
                localField: "_id.presentation",
                foreignField: "_id",
                as: "presentationInfo"
            }
        },
        {
            $group: {
                _id: {
                    movie: "$presentationInfo.movie",
                },
                count: {$sum:"$$ROOT.count"}
            }
        },
        {
            $project: {
                movie: {$arrayElemAt: ["$_id.movie", 0]},
                count: 1,
                _id: 0,
            }
        },
        {
            $lookup: {
                from: "movies",
                localField: "movie",
                foreignField: "_id",
                as: "movie"
            }
        },
        {
            $project: {
                movie: {$arrayElemAt: ["$movie", 0]},
                count: 1,
            }
        },
        { $sort : { count: -1 } },
        { $limit : amount },

    ])

        .then(tickets => res.send(tickets))
        .catch(err => errors.databaseError(err, res))
};

module.exports.getBusyTimes = (req, res) => {
    Movie.find(req.query)
        .then(movie => res.send(movie))
        .catch(err => errors.databaseError(err, res))
};

function getDateXDaysAgo(days) {
    return new Date(new Date().setDate(new Date().getDate() - days));
}

// This function returns an ObjectId embedded with a given datetime
// Accepts both Date object and string input

function objectIdWithTimestamp(timestamp) {
    // Convert string date to Date object (otherwise assume timestamp is a date)
    if (typeof(timestamp) == 'string') {
        timestamp = new Date(timestamp);
    }

    // Convert date object to hex seconds since Unix epoch
    var hexSeconds = Math.floor(timestamp / 1000).toString(16);

    // Create an ObjectId with that hex timestamp
    var constructedObjectId = ObjectID(hexSeconds + "0000000000000000");

    return constructedObjectId
}
