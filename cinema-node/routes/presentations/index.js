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

    return router;
};
