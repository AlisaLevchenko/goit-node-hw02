const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().required().messages({
    "string.base": "name should be a type of string",
    "any.required": "missing required name field",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "name should be a type of string",
      "string.email": "field 'email' must be a valid email",
      "any.required": "missing required name field",
    }),
  phone: Joi.string().trim().required().messages({
    "string.base": "name should be a type of string",
    "any.required": "missing required name field",
  }),
});

const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().required().messages({
    "string.base": "name should be a type of string",
    "any.required": "missing required name field",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "name should be a type of string",
      "string.email": "field 'email' must be a valid email",
      "any.required": "missing required name field",
    }),
  phone: Joi.string().trim().required().messages({
    "string.base": "name should be a type of string",
    "any.required": "missing required name field",
  }),
  favorite: Joi.boolean(),
});

const schemaUpdateFavorite = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

module.exports = {
  addContactSchema,
  updateContactSchema,
  schemaUpdateFavorite,
};
