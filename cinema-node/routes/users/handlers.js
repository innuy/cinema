const errors = require("./errors");
const User = require('../../db/models/users');
const passport = require('passport');
var ObjectID = require('mongodb').ObjectID;

module.exports.create = (req, res) => {
    const user = req.body;
    const finalUser = new User(user);

    finalUser.setPassword(user.password);

    finalUser.save()
        .then(() => res.send(finalUser))
        .catch(err => errors.databaseError(err, res));
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
                throw(errors.userNotFound);
            } else {
                return(deleteUserById(id_filter));
            }
        })
        .then(user => {
            res.status(204);
            res.send({});
        })
        .catch(err => {
            if (err instanceof Function) {
                err(res);
            } else {
                errors.databaseError(err, res);
            }
        });
};

module.exports.login = (req, res, next) => {
    const user = req.body;

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
            return next(err);
        }

        if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }

        return res.status(400).send(info);
    })(req, res, next);
};


module.exports.current = (req, res, next) => {
    const { payload: { id } } = req;

    return User.findById(id)
        .then((user) => {
            if(!user) {
                return errors.userNotFound(res);
            }

            return res.json({ user: user.toAuthJSON() });
        });
};


const deleteUserById = id_filter => new Promise((resolve, reject) => {
    User.findOneAndDelete(id_filter)
        .then(user => {
            resolve(user);
        })
        .catch(err => reject(err))
});

function thereIsNoUser(user) {
    if (Array.isArray(user))
        return user.length === 0;
    else
        return user === null;
}