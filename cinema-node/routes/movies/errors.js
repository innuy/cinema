module.exports.databaseError = (err, res) => {
    res.status(500);
    res.send({
        "statusCode": 500,
        "error": "Database error",
        "message": err
    });
};

module.exports.movieNotFound = res => {
    res.status(404);
    res.send({
        "statusCode": 404,
        "error": "Not Found",
        "message": "there is no movie here"
    });
};