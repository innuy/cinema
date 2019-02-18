const jwt = require('express-jwt');
const errors = require("./errors");
const User = require('../db/models/users');

const userRoleKey = 1;
const adminRoleKey = 2;
const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if(authorization && authorization.split(' ')[0] ==='Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

const adminOnly = (req, res, next) => {
    const user = req.requestingUser;
    if (user.role === adminRoleKey){
        next();
    }
    else{
        errors.notFoundError(res);
    }
};

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'requestingUser',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'requestingUser',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
    adminOnly: adminOnly,
    adminRoleKey: adminRoleKey,
    userRoleKey: userRoleKey,
};

module.exports = auth;
