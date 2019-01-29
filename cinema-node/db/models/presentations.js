var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var PresentationSchema = new Schema({
    movie: {
        type: ObjectId,
        required: true,
        ref: 'Movie',
    },
    auditorium: {
        type: ObjectId,
        required: true,
        ref: 'Auditorium',
    },
    start: {
        type: Date,
        required: true,
    },
    soldTickets: {
        type: Number,
        required: true,
    },
});

var PresentationModel = mongoose.model('Presentation', PresentationSchema);

module.exports = PresentationModel;
