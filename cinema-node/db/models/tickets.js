var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var TicketSchema = new Schema({
    presentation: {
        type: ObjectId,
        required: true,
        ref: 'Presentation'
    },
    seat: {
        type: ObjectId,
        required: true,
        ref: 'Seat',
    },
    sold: {
        type: Boolean,
        required: true,
    },
});

var TicketModel = mongoose.model('Ticket', TicketSchema);

module.exports = TicketModel;
