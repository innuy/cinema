const handlers = require('./handlers');
const validation = require('./validation');
const auth = require('../../middlewares/auth');

/**
 * Dashboard routes.
 *
 * @param {Object} router
 * @return {Object}
 */

module.exports = router => {

    router.get('/dashboard/top-movies',
        auth.required,
        auth.adminOnly,
        validation.getTopMovies,
        handlers.getTopMovies,
    );

    router.get('/dashboard/sold-ratio',
        auth.required,
        auth.adminOnly,
        handlers.getSoldRatio,
    );

    router.get('/dashboard/busy-times',
        handlers.getBusyTimes,
    );

    return router;
};
