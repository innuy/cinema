const {celebrate, Joi} = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const create = celebrate({
    body: {
        number: Joi.number().required(),
        seatRows: Joi.number().required(),
        seatColumns: Joi.number().required(),
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
        seatRows: Joi.number().required(),
        seatColumns: Joi.number().required(),
    }
});

module.exports = {
    create,
    get,
    getById,
    putById,
};
