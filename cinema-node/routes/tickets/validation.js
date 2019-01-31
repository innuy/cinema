const {celebrate, Joi} = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const create = celebrate({
    body: {
        presentation: Joi.objectId().required(),
        seat: Joi.objectId(),
        seatRow: Joi.number().positive().integer(),
        seatColumn: Joi.number().positive().integer(),
    }
});

const get = celebrate({
    query: {
        presentation: Joi.objectId(),
        seat: Joi.objectId(),
        seatRow: Joi.number().positive().integer(),
        seatColumn: Joi.number().positive().integer(),
        sold: Joi.boolean(),
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
        presentation: Joi.objectId().required(),
        seat: Joi.objectId().required(),
        sold: Joi.boolean().required(),
    }
});

const deleteById = celebrate({
    params: {
        id: Joi.objectId(),
    }
});

module.exports = {
    create,
    get,
    getById,
    putById,
    deleteById,
};
