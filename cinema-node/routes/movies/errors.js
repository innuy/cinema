module.exports.databaseError = (err, res) => {
    res.status(500);
    res.send({
        "statusCode": 500,
        "error": "Database error",
        "message": err
    });
};

module.exports.presentationNotFound = res => {
    res.status(412);
    res.send({
        "statusCode": 412,
        "error": "Not Found",
        "message": "there is no presentation here"
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