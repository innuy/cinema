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


    return router;

};