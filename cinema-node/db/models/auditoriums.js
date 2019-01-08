var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuditoriumSchema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    seatRows: {
        type: Number,
        required: true,
    },
    seatColumns: {
        type: Number,
        required: true,
    },

});

var AuditoriumModel = mongoose.model('Auditorium', AuditoriumSchema);

module.exports = AuditoriumModel;
