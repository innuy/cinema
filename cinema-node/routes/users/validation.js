const {celebrate, Joi} = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);


const create = celebrate({
    body: {
        email:  Joi.string().email({ minDomainAtoms: 2 }).required(),
        name: Joi.string().required(),
        surname: Joi.string().required(),
        role: Joi.number().positive().integer().valid([ 1, 2 ]).required(),
    }
});

const get = celebrate({
    query: {
        user: Joi.string(),
        name: Joi.string(),
        surname: Joi.number().positive().integer(),
        role: Joi.number().positive().integer().valid([ 1, 2 ]),
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
        email:  Joi.string().email({ minDomainAtoms: 2 }).required(),
        name: Joi.string().required(),
        surname: Joi.string().required(),
        role: Joi.number().positive().integer().valid([ 1, 2 ]).required(),
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
