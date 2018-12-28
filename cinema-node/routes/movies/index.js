const handlers = require('./handlers');

module.exports = router => {

    router.post('/movies',
        handlers.create,
    );
    return router;
};
