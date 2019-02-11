const handlers = require('./handlers');
const validation = require('./validation');
/**
 * User routes.
 *
 * @param {Object} router
 * @return {Object}
 */

module.exports = router => {

    router.post('/users',
        validation.create,
        handlers.create,
    );

    router.get('/users',
        validation.get,
        handlers.get,
    );

    router.get('/users/:id',
        validation.getById,
        handlers.getById,
    );

    router.put('/users/:id',
        validation.putById,
        handlers.putById,
    );

    router.delete('/users/:id',
        validation.deleteById,
        handlers.deleteById,
    );

    return router;
};
