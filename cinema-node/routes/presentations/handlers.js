const errors = require("./errors");
const Presentation = require("../../db/models/presentations");

module.exports.create = (req, res) => {
    Presentation.create(req.body)
        .then(presentation => res.send(presentation))
        .catch(err => errors.databaseError(err, res))
};