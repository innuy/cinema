const Ticket = require("../../db/models/tickets");
var ObjectID = require('mongodb').ObjectID;

module.exports.queryTopMovies = (timeRangeInDays, amount) => new Promise((resolve, reject) => {

    let getGreaterThanXDaysAgoIdFilter = {_id: {$gt: objectIdWithTimestamp(getDateXDaysAgo(timeRangeInDays))}};
    Ticket.aggregate([
        {$match: getGreaterThanXDaysAgoIdFilter},
        {
            $group: {
                _id: {
                    presentation: "$presentation",
                },
                reserved: {$sum: 1},
                sold: {$sum: {$cond: [{$eq: ['$sold', true]}, 1, 0]}}
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
                reserved: {$sum: "$$ROOT.reserved"},
                sold: {$sum: "$$ROOT.sold"}
            }
        },
        {
            $project: {
                movie: {$arrayElemAt: ["$_id.movie", 0]},
                reserved: 1,
                sold: 1,
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
                reserved: 1,
                sold: 1,
            }
        },
        {$sort: {reserved: -1, sold: -1}},
        {$limit: amount},
    ])
        .then(tickets => resolve(tickets))
        .catch(err => reject(err));
});

module.exports.querySoldRatio = timeRangeInDays => new Promise((resolve, reject) => {
    let getGreaterThanXDaysAgoIdFilter = {_id: {$gt: objectIdWithTimestamp(getDateXDaysAgo(timeRangeInDays))}};
    Ticket.aggregate([
        {$match: getGreaterThanXDaysAgoIdFilter},
        {
            $facet: {
                soldTickets: [
                    {$group: {_id: null, soldTickets: {$sum: {$cond: [{$eq: ['$sold', true]}, 1, 0]}}}},
                    {$project: {_id: 0}}
                ],
                reservedTickets: [
                    {$count: 'reservedTickets'},
                ],
            }
        }
    ])
        .then(tickets => resolve({
            soldTickets: tickets[0].soldTickets[0].soldTickets,
            reservedTickets: tickets[0].reservedTickets[0].reservedTickets
        }))
        .catch(err => reject(err))
});

module.exports.queryBusyTimes = timeRangeInDays => new Promise((resolve, reject) => {
    let getGreaterThanXDaysAgoIdFilter = {_id: {$gt: objectIdWithTimestamp(getDateXDaysAgo(timeRangeInDays))}};
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
            $project: {
                h: {$hour: {
                    date: {$arrayElemAt: ["$presentationInfo.start", 0]},
                    timezone: 'America/Montevideo'
                } },
                tickets: "$count",
                _id: 0,
            }
        },
        {
            $group: {
                _id: {
                    hour: "$h"
                },
                total: {$sum: "$tickets"}
            }
        },
        {
            $project: {
                _id: 0,
                hour: "$_id.hour",
                tickets: "$total",
            }
        },
        {
            $sort: {"hour": -1}
        },
    ])
        .then(tickets => resolve(parseTickets(tickets)))
        .catch(err => reject(err))
});

const getDateXDaysAgo = days => new Date(new Date().setDate(new Date().getDate() - days));

// This function returns an ObjectId embedded with a given datetime
// Accepts both Date object and string input

const objectIdWithTimestamp = timestamp => {
    // Convert string date to Date object (otherwise assume timestamp is a date)
    if (typeof (timestamp) == 'string') {
        timestamp = new Date(timestamp);
    }

    // Convert date object to hex seconds since Unix epoch
    var hexSeconds = Math.floor(timestamp / 1000).toString(16);

    // Return an ObjectId with that hex timestamp
    return ObjectID(hexSeconds + "0000000000000000")
};

const parseTickets = tickets => [...Array(24).keys()].map((hour) => {
    const data = tickets.find((ticket) => ticket.hour === hour);
    return data ? data : {hour: hour, tickets: 0};
});