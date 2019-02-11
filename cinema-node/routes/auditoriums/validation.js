const {celebrate, Joi} = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const create = celebrate({
    body: {
        number: Joi.number().required(),
        seatRows: Joi.number().positive().integer().required(),
        seatColumns: Joi.number().positive().integer().required(),
    }
});

const get = celebrate({
    query: {
        number: Joi.number(),
    }
});

const getById = celebrate({
    params: {
        id: Joi.objectId().required(),
    }
});

const putById = celebrate({
    params: {
        id: Joi.objectId().required(),
    },
    body: {
        number: Joi.number().required(),
        seatRows: Joi.number().positive().integer().required(),
        seatColumns: Joi.number().positive().integer().required(),
    }
});

const deleteById = celebrate({
    params: {
        id: Joi.objectId().required(),
    }
});

module.exports = {
    create,
    get,
    getById,
    putById,
    deleteById,
};
