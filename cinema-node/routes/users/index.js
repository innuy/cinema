const adminOnly = require("../../middlewares/roleAuthentication");

const handlers = require('./handlers');
const validation = require('./validation');
const auth = require('../auth');
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
        adminOnly,
        validation.get,
        handlers.get,
    );

    router.get('/users/:id',
        auth.required,
        adminOnly,
        validation.getById,
        handlers.getById,
    );

    router.put('/users/:id',
        auth.required,
        adminOnly,
        validation.putById,
        handlers.putById,
    );

    router.delete('/users/:id',
        auth.required,
        adminOnly,
        validation.deleteById,
        handlers.deleteById,
    );

    router.post('/login',
        auth.optional,
        validation.login,
        handlers.login,
    );

    router.get('/user/current',
        auth.required,
        adminOnly,
        handlers.getCurrent,
    );

    );

    return router;
};
