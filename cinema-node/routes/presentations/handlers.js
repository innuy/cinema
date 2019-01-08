const errors = require("./errors");
const Presentation = require("../../db/models/presentations");
var ObjectID = require('mongodb').ObjectID;

module.exports.create = (req, res) => {
    Presentation.create(req.body)
        .then(presentation => res.send(presentation))
        .catch(err => errors.databaseError(err, res))
};

module.exports.get = (req, res) => {
    Presentation.find(req.query)
        .then(presentation => res.send(presentation))
        .catch(err => errors.databaseError(err, res))
};

module.exports.getById = (req, res) => {
    const id = req.params.id;
    const id_filter = {'_id': new ObjectID(id)};

    Presentation.find(id_filter)
        .then(presentation => {
            if (thereIsNoPresentation(presentation)) {
                errors.presentationNotFound(res);
            } else {
                res.send(presentation);
            }
        })
        .catch(err => errors.databaseError(err, res))
};

module.exports.putById = (req, res) => {
    const id_filter = {'_id': new ObjectID(req.params.id)};
    const setToReturnUpdatedValue = {new: true};
    const parametersToSet = {$set: req.body};

    Presentation.findOneAndUpdate(
        id_filter,
        parametersToSet,
        setToReturnUpdatedValue,
    )
        .then(presentation => {
            if (thereIsNoPresentation(presentation)) {
                errors.presentationNotFound(res);
            } else {
                res.send();
            }
        })
        .catch(err => errors.databaseError(err, res))
};

function thereIsNoPresentation(presentation) {
    if ( Array.isArray(presentation))
        return presentation.length === 0;
    else
        return presentation === null;
}
