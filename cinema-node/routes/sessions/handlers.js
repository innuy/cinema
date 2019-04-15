const errors = require("./errors");
const passport = require('passport');

const auth = require('../../middlewares/auth');


module.exports.login = (req, res, next) => {
    const user = req.body;

    return passport.authenticate('local', {session: false},
        (err, passportUser, info) => {
            if (err) {
                return errors.authenticationError(err.message, res);
            }

            if (passportUser) {
                const user = passportUser;
                user.token = passportUser.generateJWT();

                return res.json({user: user.toAuthJSON()});
            }

            return res.status(400).send(info);
        }
    )(req, res, next);
};
