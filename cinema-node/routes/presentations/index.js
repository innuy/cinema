const handlers = require('./handlers');
const validation = require('./validation');
const auth = require('../../middlewares/auth');
/**
 * Movie routes.
 *
 * @param {Object} router
 * @return {Object}
 */

module.exports = router => {

    router.post('/presentations',
        auth.required,
        auth.adminOnly,
        validation.create,
        handlers.create,
    );

    router.get('/presentations',
        auth.required,
        validation.get,
        handlers.get,
    );

    router.get('/presentations/:id',
        auth.required,
        validation.getById,
        handlers.getById,
    );

    router.put('/presentations/:id',
        auth.required,
        auth.adminOnly,
        validation.putById,
        handlers.putById,
    );

    router.delete('/presentations/:id',
        auth.required,
        auth.adminOnly,
        validation.deleteById,
        handlers.deleteById,
    );

    return router;
};
