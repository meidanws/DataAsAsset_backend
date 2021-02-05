const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

// Register validation 
const registerValidation = data => {
    const schema = {
        fullName: Joi.string()
        .min(6)
        .required(),
        userName:Joi.string()
        .min(6)
        .required(),
        email:Joi.string()
        .min(6)
        .required()
        .email(),
        password:Joi.string()
        .min(6)
        .required()
    };
    return Joi.valid(data,schema);
};

// Login validation 
const loginValidation = data => {
    const schema = Joi.object({
        userName:Joi.string()
        .min(6).
        required(),
        password:Joi.string()
        .min(6)
        .required()
    });
    return loginValidation.validate(data,schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;