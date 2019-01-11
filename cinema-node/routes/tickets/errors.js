
module.exports.presentationAlreadyStarted = (res, presentationId) => {
    res.status(400);
    res.send({
        "statusCode": 400,
        "error": "Database error",
        "message": "the presentation id=[" + presentationId + "] had started"
    })
};

module.exports.databaseError = (res, err) => {
    res.status(500);
    res.send({
        "statusCode": 500,
        "error": "Database error",
        "message": err
    });
};

module.exports.incompleteSeatInformation = res => {
    res.status(400);
    res.send({
        "statusCode": 400,
        "error": "Bad Request",
        "message": "seat id or row and column are needed"
    });
};

module.exports.incompleteSeatInformation = res => {
    res.status(400);
    res.send({
        "statusCode": 400,
        "error": "Bad Request",
        "message": "seat id or row and column are needed"
    });
};

module.exports.ticketNotFound = res => {
    res.status(404);
    res.send({
        "statusCode": 404,
        "error": "Not Found",
        "message": "there is no presentation here"
    });
};

module.exports.seatNotFound = res => {
    res.status(404);
    res.send({
        "statusCode": 404,
        "error": "Not Found",
        "message": "there is no seat here"
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

module.exports.presentationNotFound = res => {
    res.status(412);
    res.send({
        "statusCode": 412,
        "error": "Precondition Failed ",
        "message": "the presentation selected doesn't exist"
    });
};

module.exports.unavailableSeat = res => {
    res.status(412);
    res.send({
        "statusCode": 412,
        "error": "Precondition Failed ",
        "message": "the seat selected is unavailable"
    });
};
