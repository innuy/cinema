const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const create = celebrate({
    body:{
        movie: Joi.objectId().required(),
        auditorium: Joi.objectId().required(),
        start: Joi.date().iso().required(),
        soldTickets: Joi.number().required(),
    }
});

module.exports = {
    create,
};