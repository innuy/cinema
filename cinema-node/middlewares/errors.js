
module.exports.notFoundError = res => {
    res.status(404);
    res.send({
        "statusCode": 404,
        "error": "Not Found",
        "message": "The page you ask for doesnt exist"
    });
};