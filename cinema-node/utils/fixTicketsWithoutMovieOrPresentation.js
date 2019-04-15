let app = require('../app');
const request = require('supertest');
const Movie = require("../../cinema-node/db/models/movies");
const Ticket = require("../db/models/tickets");
var ObjectID = require('mongodb').ObjectID;


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

const fixTicketsWithoutMovieOrPresentation = async () => await new Promise((resolve, reject) => {
    const timeRangeInDays = 120;

    console.log("Getting tickets");
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
                localField: "presentation",
                foreignField: "_id",
                as: "presentationInfo"
            }
        },
        // {
        //     $group: {
        //         _id: {
        //             movie: "$presentationInfo.movie",
        //         },
        //         reserved: {$sum: "$$ROOT.reserved"},
        //         sold: {$sum: "$$ROOT.sold"}
        //     }
        // },
        // {
        //     $project: {
        //         movie: {$arrayElemAt: ["$_id.movie", 0]},
        //         reserved: 1,
        //         sold: 1,
        //         _id: 0,
        //     }
        // },
        // {
        //     $lookup: {
        //         from: "movies",
        //         localField: "movie",
        //         foreignField: "_id",
        //         as: "movie"
        //     }
        // },
        // {
        //     $project: {
        //         movie: {$arrayElemAt: ["$movie", 0]},
        //         reserved: 1,
        //         sold: 1,
        //     }
        // },
        // {$sort: {reserved: -1, sold: -1}},
        // {$limit: amount},
    ])
        .then(ticketGroup => {
            console.log("Deleting tickets");
            ticketGroup.filter((value, index, arr) => {
                return value.presentationInfo.length === 0;
            });
            if (ticketGroup.length === 0) {
                console.log("No tickets with invalid presentation");
            } else {
                for (let i = 0; i < ticketGroup.length; i++) {
                    Ticket.deleteMany({'presentation': ticketGroup[i]._id.presentation})
                        .then(dbResponse => {
                            console.log(JSON.stringify(dbResponse));
                        })
                        .catch(err => console.log(err));
                }
            }

            console.log("Delete process finalized");
            resolve(filter)
        })
        .catch(err => reject(err));
});

fixTicketsWithoutMovieOrPresentation()
    .then(tickets => console.log(JSON.stringify(tickets)));
