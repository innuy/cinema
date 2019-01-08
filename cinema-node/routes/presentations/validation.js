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

const get = celebrate({
    query: {
        movie: Joi.objectId(),
        auditorium: Joi.objectId(),
        start: Joi.date().iso(),
        soldTickets: Joi.number(),
    }
});

const getById = celebrate({
    params: {
        id: Joi.objectId(),
    }
});

const putById = celebrate({
    params: {
        id: Joi.objectId(),
    },
    body: {
        movie: Joi.objectId().required(),
        auditorium: Joi.objectId().required(),
        start: Joi.date().iso().required(),
        soldTickets: Joi.number().required(),
    }
});

module.exports = {
    create,
    get,
    getById,
    putById,
};