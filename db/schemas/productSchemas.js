import Joi from 'joi';

export const productCreateSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": '"name" cannot be an empty field',
    "any.required": '"name" is required',
  }),
  category: Joi.string().required().messages({
      "string.base": '"category" must be a string',
      "string.empty": '"category" cannot be an empty field',
  }),
  imgURL: Joi.string().uri().optional().messages({
    "string.uri": '"imgURL" must be a valid URI',
  }),
  information: Joi.string().optional().messages({
    "string.base": '"information" must be a string',
  }),
  params: Joi.object().optional().messages({
    "object.base": '"params" must be an object',
  }),
});

export const productUpdateSchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.empty": '"name" cannot be an empty field',
  }),
  category: Joi.string().optional().messages({
    "string.base": '"category" must be a string',
  }),
  imgURL: Joi.string().uri().optional().messages({
    "string.uri": '"imgURL" must be a valid URI',
  }),
  information: Joi.string().optional().messages({
    "string.base": '"information" must be a string',
  }),
  params: Joi.object().optional().messages({
    "object.base": '"params" must be an object',
  }),
});