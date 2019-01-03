const handlers = require('./handlers');
const validation = require('./validation');
/**
 * Movie routes.
 *
 * @param {Object} router
 * @return {Object}
 */

module.exports = router => {

    router.post('/movies',
        validation.create,
        handlers.create,
    );

    router.get('/movies',
        validation.get,
        handlers.get,
    );

    router.get('/movies/:id',
        validation.getById,
        handlers.getById,
    );

    router.put('/movies/:id',
        validation.putById,
        handlers.putById,
    );

    router.delete('/movies/:id',
        validation.deleteById,
        handlers.deleteById,
    );

    return router;
};
