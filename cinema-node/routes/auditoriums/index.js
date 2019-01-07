const handlers = require('./handlers');
const validation = require('./validation');
/**
 * Auditorium routes.
 *
 * @param {Object} router
 * @return {Object}
 */

module.exports = router => {

    router.post('/auditoriums',
        validation.create,
        handlers.create,
    );

    router.get('/auditoriums',
        validation.get,
        handlers.get,
    );

    router.get('/auditoriums/:id',
        validation.getById,
        handlers.getById,
    );

    router.put('/auditoriums/:id',
        validation.putById,
        handlers.putById,
    );

    router.delete('/auditoriums/:id',
        validation.deleteById,
        handlers.deleteById,
    );

    return router;

};