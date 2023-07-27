const Joi = require('joi');

const { emailRegexp } = require('../utils/user');

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const userEmailSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ 'any.required': 'Missing required field email' }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  registerSchema,
  userEmailSchema,
  loginSchema,
};
