const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Username cannot be empty",
    "string.min": "Username should have a minimum length of 3",
    "any.required": "Username is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password should have a minimum length of 8",
    "any.required": "Password is required",
  }),
  fullName: Joi.string().required().messages({
    "any.required": "Full name is required",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": "Gender must be either male, female, or other",
    "any.required": "Gender is required",
  }),
  dateOfBirth: Joi.date().required().messages({
    "date.base": "Date of Birth must be a valid date",
    "any.required": "Date of Birth is required",
  }),
  country: Joi.string().required().messages({
    "string.empty": "Country cannot be empty",
    "any.required": "Country is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password should have a minimum length of 8",
    "any.required": "Password is required",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
