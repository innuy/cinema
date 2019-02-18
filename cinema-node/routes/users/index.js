const handlers = require('./handlers');
const validation = require('./validation');
const auth = require('../../middlewares/auth');
/**
 * User routes.
 *
 * @param {Object} router
 * @return {Object}
 */

module.exports = router => {

    router.post('/users',
        auth.optional,
        validation.create,
        handlers.create,
    );

    router.get('/users',
        auth.required,
        auth.adminOnly,
        validation.get,
        handlers.get,
    );

    router.get('/users/current',
        auth.required,
        handlers.getCurrent,
    );

    router.get('/users/:id',
        auth.required,
        auth.adminOnly,
        validation.getById,
        handlers.getById,
    );

    router.put('/users/current',
        auth.required,
        validation.putCurrent,
        handlers.putCurrent,
    );

    router.put('/users/:id',
        auth.required,
        auth.adminOnly,
        validation.putById,
        handlers.putById,
    );

    router.delete('/users/:id',
        auth.required,
        auth.adminOnly,
        validation.deleteById,
        handlers.deleteById,
    );

    router.patch('/users',
        auth.optional,
        validation.updatePassword,
        handlers.updatePassword,
    );

    return router;
};
