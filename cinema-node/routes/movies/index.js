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

    router.post('/movies',
        auth.required,
        auth.adminOnly,
        validation.create,
        handlers.create,
    );

    router.get('/movies',
        auth.optional,
        validation.get,
        handlers.get,
    );

    router.get('/movies/:id',
        auth.required,
        auth.adminOnly,
        validation.getById,
        handlers.getById,
    );

    router.put('/movies/:id',
        auth.required,
        auth.adminOnly,
        validation.putById,
        handlers.putById,
    );

    router.delete('/movies/:id',
        auth.required,
        auth.adminOnly,
        validation.deleteById,
        handlers.deleteById,
    );

    router.post('/image-upload',
        auth.required,
        auth.adminOnly,
        handlers.imageUpload,
    );

    router.post('/movie/image-upload/:id',
        auth.required,
        auth.adminOnly,
        handlers.movieImageUpload,
    );

    return router;
};
