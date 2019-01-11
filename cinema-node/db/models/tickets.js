var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var TicketSchema = new Schema({
    presentation: {
        type: ObjectId,
        required: true,
    },
    seat: {
        type: ObjectId,
        required: true,
    },
});

var TicketModel = mongoose.model('Ticket', TicketSchema);

module.exports = TicketModel;
