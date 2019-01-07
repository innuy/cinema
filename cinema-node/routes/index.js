const movies = require('./movies');
const auditoriums = require('./auditoriums');

const resourceRoutes = [movies, auditoriums];

module.exports = router => {

  resourceRoutes.forEach(routes => routes(router));

  return router;
};