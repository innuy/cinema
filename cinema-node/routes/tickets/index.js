const handlers = require('./handlers');
const validation = require('./validation');
const auth = require('../../middlewares/auth');
/**
 * Ticket routes.
 *
 * @param {Object} router
 * @return {Object}
 */

module.exports = router => {

    router.post('/tickets',
        auth.required,
        validation.create,
        handlers.create,
    );

    router.get('/tickets',
        auth.required,
        validation.get,
        handlers.get,
    );

    router.get('/tickets/:id',
        auth.required,
        validation.getById,
        handlers.getById,
    );

    router.put('/tickets/:id',
        auth.required,
        auth.adminOnly,
        validation.putById,
        handlers.putById,
    );

    router.delete('/tickets/:id',
        auth.required,
        auth.adminOnly,
        validation.deleteById,
        handlers.deleteById,
    );

    return router;
};
