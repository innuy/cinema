
module.exports.adminOnly = res => {
    res.status(404);
    res.send({
        "statusCode": 403,
        "error": "Forbidden",
        "message": "Forbidden to all not admin users "
    });
};