const {celebrate, Joi} = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const create = celebrate({
    body: {
        name: Joi.string().required(),
        duration: Joi.string().required(),
        image: Joi.string(),
        director: Joi.string().required(),
        actors: Joi.array().items(Joi.string()).required(),
        summary: Joi.string().required(),
    }
});

const get = celebrate({
    query: {
        name: Joi.string(),
        duration: Joi.string(),
        image: Joi.string(),
        director: Joi.string(),
        actors: Joi.array().items(Joi.string()),
        summary: Joi.string(),
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
        name: Joi.string().required(),
        duration: Joi.string().required(),
        image: Joi.string(),
        director: Joi.string().required(),
        actors: Joi.array().items(Joi.string()).required(),
        summary: Joi.string().required(),
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