const middlewareErrors = require('./errors');
/**
 * Movie routes.
 *
 * @param {Object} router
 * @return {Object}
 */

module.exports = router => {

    router.all('*', (req, res) => {
        middlewareErrors.notFoundError(res);
    });

    return router;
};