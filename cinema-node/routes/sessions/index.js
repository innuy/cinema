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

    router.post('/session',
        auth.optional,
        validation.login,
        handlers.login,
    );

    return router;
};
