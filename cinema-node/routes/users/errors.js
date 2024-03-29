module.exports.databaseError = (err, res) => {
    res.status(500);
    res.send({
        "statusCode": 500,
        "error": "Database error",
        "message": err
    });
};

module.exports.userNotFound = res => {
    res.status(404);
    res.send({
        "statusCode": 404,
        "error": "Not Found",
        "message": "there is no user here"
    });
};

module.exports.authenticationError = (err, res) => {
    res.status(403);
    res.send({
        "statusCode": 403,
        "error": "Authentication error",
        "message": err
    });
};

module.exports.needAdminAccessError = (err, res) => {
    res.status(401);
    res.send({
        "statusCode": 401,
        "error": "Authentication error",
        "message": err
    });
};
