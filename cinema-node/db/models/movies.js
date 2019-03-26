var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    duration: {
        type: String,
        required: false,
    },
    director: {
        type: String,
        required: false,
    },
    actors: {
        type: [String],
        required: false,
    },
    summary: {
        type: String,
        required: false,
    },
});

var MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel;
