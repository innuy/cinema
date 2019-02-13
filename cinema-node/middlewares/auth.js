const jwt = require('express-jwt');
const errors = require("./errors");
const User = require('../db/models/users');

const userKey = 1;
const adminKey = 2;
const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if(authorization && authorization.split(' ')[0] ==='Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

const adminOnly = (req, res, next) => {
    const user = req.payload;
    if (user.role === adminKey){
        next();
    }
    else{
        errors.adminOnly(res);
    }
};

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
    adminOnly: adminOnly,
};

module.exports = auth;
