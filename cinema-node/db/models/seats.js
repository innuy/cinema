var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var SeatSchema = new Schema({
    row: {
        type: Number,
        required: true,
    },
    column: {
        type: Number,
        required: true,
    },
    auditorium: {
        type: ObjectId,
        required: true,
    },
});

var SeatModel = mongoose.model('Seat', SeatSchema);
module.exports = SeatModel;


