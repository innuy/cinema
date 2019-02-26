const errors = require("./errors");
const dashboardQueries = require('./queries');

const timeRangeInDays = 30;

module.exports.getTopMovies = (req, res) => {
    let amount = req.query.amount;

    dashboardQueries.queryTopMovies(timeRangeInDays, amount)
        .then(tickets => res.send(tickets))
        .catch(err => errors.databaseError(err, res))
};

module.exports.getSoldRatio = (req, res) => {

    dashboardQueries.querySoldRatio(timeRangeInDays)
        .then(tickets => res.send(tickets))
        .catch(err => errors.databaseError(err, res))
};

module.exports.getBusyTimes = (req, res) => {

    dashboardQueries.queryBusyTimes(timeRangeInDays)
        .then(tickets => res.send(tickets))
        .catch(err => errors.databaseError(err, res));
};
