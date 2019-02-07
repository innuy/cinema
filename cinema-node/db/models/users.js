var mongoose = require('mongoose');
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

});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;