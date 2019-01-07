
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

    return router;

};