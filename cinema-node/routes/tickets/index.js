const handlers = require('./handlers');
const validation = require('./validation');
/**
 * Ticket routes.
 *
 * @param {Object} router
 * @return {Object}
 */

module.exports = router => {

    router.post('/tickets',
        validation.create,
        handlers.create,
    );

    router.get('/tickets',
        validation.get,
        handlers.get,
    );

    router.get('/tickets/:id',
        validation.getById,
        handlers.getById,
    );

    router.put('/tickets/:id',
        validation.putById,
        handlers.putById,
    );

    router.delete('/tickets/:id',
        validation.deleteById,
        handlers.deleteById,
    );

    return router;
};
