const movies = require('./movies');
const auditoriums = require('./auditoriums');
const presentations = require('./presentations');
const tickets = require('./tickets');
const users = require('./users');
const dashboard = require('./dashboard');
const sessions = require('./sessions');

const resourceRoutes = [
    movies,
    auditoriums,
    presentations,
    tickets,
    users,
    sessions,
    dashboard
];


module.exports = router => {

    resourceRoutes.forEach(routes => routes(router));

    return router;
};