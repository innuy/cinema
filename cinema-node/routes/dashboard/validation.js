const {celebrate, Joi} = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const getTopMovies = celebrate({
    query: {
        amount: Joi.number().positive().integer().default(10),
    }
});


module.exports = {
    getTopMovies,
};