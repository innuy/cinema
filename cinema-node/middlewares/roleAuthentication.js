const errors = require("./errors");
const User = require('../db/models/users');

const userKey = 1;
const adminKey = 2;

const adminOnly = (req, res, next) => {
    const user = req.payload;
    if (user.role === adminKey){
        next();
    }
    else{
        errors.adminOnly(res);
    }

};

module.exports = adminOnly;