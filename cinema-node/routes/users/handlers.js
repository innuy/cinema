const errors = require("./errors");
const User = require('../../db/models/users');
var ObjectID = require('mongodb').ObjectID;

module.exports.create = (req, res) => {
    User.create(req.body)
        .then(user => res.send(user))
        .catch(err => errors.databaseError(err, res))
};

module.exports.get = (req, res) => {
    console.log(req.query);
    User.find(req.query)
        .then(user => res.send(user))
        .catch(err => errors.databaseError(err, res))
};

module.exports.getById = (req, res) => {
    const id = req.params.id;
    const id_filter = {'_id': new ObjectID(id)};

    User.find(id_filter)
        .then(user => {
            if (thereIsNoUser(user)) {
                errors.userNotFound(res);
            } else {
                res.send(user);
            }
        })
        .catch(err => errors.databaseError(err, res))
};

module.exports.putById = (req, res) => {
    const id_filter = {'_id': new ObjectID(req.params.id)};
    const setToReturnUpdatedValue = {new: true};
    const parametersToSet = {$set: req.body};

    User.findOneAndUpdate(
        id_filter,
        parametersToSet,
        setToReturnUpdatedValue,
    )
        .then(user => {
            if (thereIsNoUser(user)) {
                errors.userNotFound(res);
            } else {
                res.send();
            }
        })
        .catch(err => errors.databaseError(err, res))
};

module.exports.deleteById = (req, res) => {
    const id_filter = {'_id': new ObjectID(req.params.id)};
    User.find(id_filter)
        .then(users => {
            if (thereIsNoUser(users)) {
                errors.userNotFound(res);
            } else {
                deleteUserById(id_filter, res);
            }
        })
        .catch(err => errors.databaseError(err, res))
};

function deleteUserById(id_filter, res) {
    User.findOneAndDelete(id_filter)
        .then(user => {
            res.status(204);
            res.send({});
        })
        .catch(err => errors.databaseError(err, res))
}

function thereIsNoUser(user) {
    if (Array.isArray(user))
        return user.length === 0;
    else
        return user === null;
}