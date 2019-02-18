const handlers = require('./handlers');
const validation = require('./validation');

/**
 * Dashboard routes.
 *
 * @param {Object} router
 * @return {Object}
 */

module.exports = router => {

    router.get('/dashboard/top-movies',
        validation.getTopMovies,
        handlers.getTopMovies,
    );

    router.get('/dashboard/sold-ratio',
        handlers.getSoldRatio,
    );

    router.get('/dashboard/busy-times',

    );

    return router;
};
