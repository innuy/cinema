const { celebrate, Joi } = require('celebrate');


const create = celebrate({
    body:{
        number: Joi.number().required(),
        seatRows: Joi.number().required(),
        seatColumns: Joi.number().required(),
    }
});

module.exports = {
    create,
};
