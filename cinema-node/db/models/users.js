var mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        allowBlank: false,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    }

});

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    const expirationTimeRangeInDays = 60;
    expirationDate.setDate(today.getDate() + expirationTimeRangeInDays);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
        role: this.role,
    }, 'secret');
};

UserSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
        name: this.name,
        surname: this.surname,
        role: this.role,
    };
};

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
