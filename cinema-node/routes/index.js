const movies = require('./movies');
const auditoriums = require('./auditoriums');
const presentations = require('./presentations');
const tickets = require('./tickets');
const users = require('./users');

const resourceRoutes = [movies, auditoriums, presentations, tickets, users];

module.exports = router => {

    resourceRoutes.forEach(routes => routes(router));

    return router;
};