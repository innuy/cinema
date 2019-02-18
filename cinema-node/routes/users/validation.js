const {celebrate, Joi} = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const maxPasswordLenght = 6;
const minPasswordLenght = 20;

const create = celebrate({
    body: {
        email:  Joi.string().email({ minDomainAtoms: 2 }).required(),
        name: Joi.string().required(),
        surname: Joi.string().required(),
        role: Joi.number().positive().integer().valid([ 1, 2 ]).required(),
        password: Joi.string().min(minPasswordLenght).max(maxPasswordLenght).required(),
    }
});

const get = celebrate({
    query: {
        email:  Joi.string().email({ minDomainAtoms: 2 }),
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

const login = celebrate({
    body: {
        user: Joi.object().required().keys({
            email:  Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().min(minPasswordLenght).max(maxPasswordLenght.required(),
        })
    }
});

const putCurrent = celebrate({
    body: {
        email:  Joi.string().email({ minDomainAtoms: 2 }).required(),
        name: Joi.string().required(),
        surname: Joi.string().required(),
    }
});

const updatePassword = celebrate({
    body: {
        user: Joi.object().required().keys({
            email:  Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().min(minPasswordLenght).max(maxPasswordLenght.required(),
        }),
        newPassword: Joi.string().min(minPasswordLenght).max(maxPasswordLenght.required(),
    }
});

module.exports = {
    create,
    get,
    getById,
    putById,
    deleteById,
    login,
    putCurrent,
    updatePassword,
};
