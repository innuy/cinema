const handlers = require('./handlers');
const validation = require('./validation');

/**
 * Dashboard routes.
 *
 * @param {Object} router
 * @return {Object}
 */

module.exports = router => {

    router.get('/top-movies',
        validation.getTopMovies,
        handlers.getTopMovies,
    );

    router.get('/sold-ratio',
        // handlers.getTopMovies,
    );

    router.get('/busy-times',
        handlers.getBusyTimes,
    );

    return router;
};
