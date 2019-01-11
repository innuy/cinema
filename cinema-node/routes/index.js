const movies = require('./movies');
const auditoriums = require('./auditoriums');
const presentations = require('./presentations');
const tickets = require('./tickets');

const resourceRoutes = [movies, auditoriums, presentations, tickets];

module.exports = router => {

  resourceRoutes.forEach(routes => routes(router));

  return router;
};