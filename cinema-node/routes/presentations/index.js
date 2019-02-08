const handlers = require('./handlers');
const validation = require('./validation');
/**
 * Movie routes.
 *
 * @param {Object} router
 * @return {Object}
 */

module.exports = router => {

    router.post('/presentations',
        validation.create,
        handlers.create,
    );

    router.get('/presentations',
        validation.get,
        handlers.get,
    );

    router.get('/presentations/:id',
        validation.getById,
        handlers.getById,
    );

    router.put('/presentations/:id',
        validation.putById,
        handlers.putById,
    );

    router.delete('/presentations/:id',
        validation.deleteById,
        handlers.deleteById,
    );

    return router;
};
