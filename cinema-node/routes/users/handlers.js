const errors = require("./errors");
const User = require('../../db/models/users');
const passport = require('passport');
var ObjectID = require('mongodb').ObjectID;

const auth = require('../../middlewares/auth');

module.exports.create = (req, res) => {
    const user = req.body;
    const userLogged = req.requestingUser;
    const finalUser = new User(user);
    if(isCreatingAdmin(user) && isNotLogAsAdmin(userLogged)){
        return errors.needAdminAccessError('To create an administrator user you must be a logged administrator', res)
    }
    finalUser.setPassword(user.password);
    finalUser.token = finalUser.generateJWT();

    finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }))
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
    const parametersToSet = {$set: req.body};

    User.findByIdAndUpdate(
        req.params.id,
        parametersToSet,
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

module.exports.getCurrent = (req, res) => {
    const { requestingUser: { id } } = req;

    User.findById(id)
        .then((user) => {
            if(!user) {
                errors.userNotFound(res);
            }

            res.json({ user: user.toAuthJSON() });
        })
        .catch(err => errors.databaseError(err, res));
};

module.exports.putCurrent = (req, res) => {
    const { requestingUser: { id } } = req;
    const parametersToSet = {$set: req.body};

    User.findByIdAndUpdate(
        id,
        parametersToSet,
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

module.exports.updatePassword = (req, res, next) => {
    const user = req.body;
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {

        if(err) {
            return errors.authenticationError(err.message, res);
        }
        if(passportUser) {
            updatePassword(passportUser, user.newPassword)
                .then(user => {
                    return res.json({ user: user.toAuthJSON() });
                })
                .catch(err => {
                    if (err instanceof Function) {
                        err(res);
                    } else {
                        errors.databaseError(err, res);
                    }
                });
        }
        else if (info.errors["email or password"]!==undefined){
            return errors.authenticationError(info.errors, res);
        }
        else {
            return res.status(400).send(info);
        }

    })(req, res, next);
};

const isCreatingAdmin = user => user.role === auth.adminRoleKey;

const isNotLogAsAdmin = userLogged => {
    if (userLogged === undefined)
        return true;
    else
        return userLogged.role !== auth.adminRoleKey;
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

function updatePassword(passportUser, newPassword) {
    return new Promise((resolve, reject) => {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        user.setPassword(newPassword);
        const parametersToSet = {$set: user};

        User.findByIdAndUpdate(
            user._id,
            parametersToSet,
        )
            .then(user => {
                if (thereIsNoUser(user)) {
                    reject(errors.userNotFound);
                } else {
                    resolve(user);
                }
            })
            .catch(err => reject(err))
    });
}
