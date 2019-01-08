const movies = require('./movies');
const auditoriums = require('./auditoriums');
const presentations = require('./presentations');

const resourceRoutes = [movies, auditoriums, presentations];

module.exports = router => {

  resourceRoutes.forEach(routes => routes(router));

  return router;
};