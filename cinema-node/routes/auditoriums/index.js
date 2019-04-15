const handlers = require('./handlers');
const validation = require('./validation');
const auth = require('../../middlewares/auth');
/**
 * Auditorium routes.
 *
 * @param {Object} router
 * @return {Object}
 */

module.exports = router => {

    router.post('/auditoriums',
        auth.required,
        auth.adminOnly,
        validation.create,
        handlers.create,
    );

    router.get('/auditoriums',
        auth.required,
        validation.get,
        handlers.get,
    );

    router.get('/auditoriums/:id',
        auth.required,
        validation.getById,
        handlers.getById,
    );

    router.put('/auditoriums/:id',
        auth.required,
        auth.adminOnly,
        validation.putById,
        handlers.putById,
    );

    router.delete('/auditoriums/:id',
        auth.required,
        auth.adminOnly,
        validation.deleteById,
        handlers.deleteById,
    );

    return router;

};