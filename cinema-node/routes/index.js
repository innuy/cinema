const movies = require('./movies');

const resourceRoutes = [movies];

module.exports = router => {
  resourceRoutes.forEach(routes => routes(router));
  return router;
};