const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const create = celebrate({
    body:{
        name: Joi.string().min(6).max(30).required(),
        duration: Joi.string().required(),
        image: Joi.string(),
        director: Joi.string().min(6).max(50).required(),
        actors: Joi.array().items(Joi.string()).required(),
        summary: Joi.string().min(6).max(100).required(),
    }
});

const get = celebrate({
    query: {
        name: Joi.string().min(6).max(30),
        duration: Joi.string(),
        image: Joi.string(),
        director: Joi.string().min(6).max(50),
        actors: Joi.array().items(Joi.string()),
        summary: Joi.string().min(6).max(100),
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
        name: Joi.string().min(6).max(30).required(),
        duration: Joi.string().required(),
        image: Joi.string(),
        director: Joi.string().min(6).max(50).required(),
        actors: Joi.array().items(Joi.string()).required(),
        summary: Joi.string().min(6).max(100).required(),
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