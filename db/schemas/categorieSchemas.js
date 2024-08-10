import Joi from 'joi';

export const categoryCreateSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": '"name" cannot be an empty field',
    "any.required": '"name" is required',
  }),
});

export const categoryUpdateSchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.empty": '"name" cannot be an empty field',
  }),
});