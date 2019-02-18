const {celebrate, Joi} = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const minPasswordLenght = 6;
const maxPasswordLenght = 20;

const login = celebrate({
    body: {
        user: Joi.object().required().keys({
            email:  Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().min(minPasswordLenght).max(maxPasswordLenght).required(),
        })
    }
});

module.exports = {
    login,
};
