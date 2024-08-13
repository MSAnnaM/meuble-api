import Joi from 'joi';

export const categoryCreateSchema = Joi.object({
  name: Joi.object({
    ua: Joi.string().required().messages({
      "string.empty": '"name.en" cannot be an empty field',
      "any.required": '"name.en" is required',
    }),
    rus: Joi.string().optional().messages({
      "string.empty": '"name.ua" cannot be an empty field',
      "any.required": '"name.ua" is required',
    }),
  }).required(),
});

export const categoryUpdateSchema = Joi.object({
  name: Joi.object({
    ua: Joi.string().optional().messages({
      "string.empty": '"name.en" cannot be an empty field',
    }),
    rus: Joi.string().optional().messages({
      "string.empty": '"name.ua" cannot be an empty field',
    }),
  }).optional(),
});