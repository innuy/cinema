const handlers = require('./handlers');

/**
 * Movie routes.
 *
 * @param {Object} router
 * @return {Object}
 */

module.exports = router => {

    router.post('/movies',
        handlers.create,
    );

    router.get('/movies',
        handlers.get,
    );

    router.get('/movies/:id',
        handlers.getById,
    );

    router.put('/movies/:id',
        handlers.putById,
    );

    return router;
};
