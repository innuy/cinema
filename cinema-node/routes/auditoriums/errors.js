module.exports.databaseError = (err, res) => {
    res.status(500);
    res.send({
        "statusCode": 500,
        "error": "Database error",
        "message": err
    });
};

module.exports.auditoriumNotFound = res => {
    res.status(404);
    res.send({
        "statusCode": 404,
        "error": "Not Found",
        "message": "there is no auditorium here"
    });
};

module.exports.auditoriumChangingSize = res => {
    res.status(403);
    res.send({
        "statusCode": 403,
        "error": "Not Found",
        "message": "the auditorium size is locked"//for the time being because of the seat references in the tickets
    });
};
