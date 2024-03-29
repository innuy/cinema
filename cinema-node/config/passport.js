const mongoose = require('mongoose');
const passport = require('passport');
var passportJWT = require("passport-jwt");
const LocalStrategy = require('passport-local');
var ExtractJwt = passportJWT.ExtractJwt;

const User = require('../db/models/users');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email, password, done) => {
    User.findOne({email})
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, {errors: {'email or password': 'is invalid'}});
            }
            return done(null, user);
        }).catch(done);
}));
