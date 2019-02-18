
module.exports.authenticationError = (err, res) => {
    res.status(403);
    res.send({
        "statusCode": 403,
        "error": "Authentication error",
        "message": err
    });
};
