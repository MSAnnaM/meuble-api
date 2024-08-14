import Joi from 'joi';

export const productCreateSchema = Joi.object({
  title: Joi.object({
    uk: Joi.string().required().messages({
      "string.empty": '"title.uk" cannot be an empty field',
      "any.required": '"title.uk" is required',
    }),
    ru: Joi.string().required().messages({
      "string.empty": '"title.ru" cannot be an empty field',
      "any.required": '"title.ru" is required',
    }),
  }).required(),

  category: Joi.string().required().messages({
    "string.empty": '"category" cannot be an empty field',
    "any.required": '"category" is required',
  }),

  imgURL: Joi.string().optional().messages({
    "string.uri": '"imgURL" must be a valid URI',
  }),

  price: Joi.object({
    currency: Joi.string().required().messages({
      "string.empty": '"currency" cannot be an empty field',
      "any.required": '"currency" is required',
    }),
    value: Joi.number().required().messages({
      "number.base": '"value" must be a number',
      "any.required": '"value" is required',
    }),
  }).required(),

  params: Joi.object({
  uk: Joi.object().pattern(
    Joi.string(),
    Joi.alternatives().try(
      Joi.string(), 
      Joi.object()
    )
  ).optional().messages({
    "object.base": '"params.uk" must be an object',
  }),
  ru: Joi.object().pattern(
    Joi.string(),
    Joi.alternatives().try(
      Joi.string(), 
      Joi.object()
    )
  ).optional().messages({
    "object.base": '"params.ru" must be an object',
  }),
  images: Joi.array().items(Joi.string()).optional().messages({
    "array.base": '"images" must be an array',
    "string.uri": '"images" must contain valid URIs',
  }),
}).optional(),
});

export const productUpdateSchema = Joi.object({
  title: Joi.object({
    uk: Joi.string().optional().messages({
      "string.empty": '"title.uk" cannot be an empty field',
    }),
    ru: Joi.string().optional().messages({
      "string.empty": '"title.ru" cannot be an empty field',
    }),
  }).optional(),

  category: Joi.string().optional().messages({
    "string.empty": '"category" cannot be an empty field',
  }),

  imgURL: Joi.string().uri().optional().messages({
    "string.uri": '"imgURL" must be a valid URI',
  }),

  price: Joi.object({
    currency: Joi.string().optional().messages({
      "string.empty": '"currency" cannot be an empty field',
    }),
    value: Joi.number().optional().messages({
      "number.base": '"value" must be a number',
    }),
  }).optional(),

  params: Joi.object({
  uk: Joi.object().pattern(
    Joi.string(),
    Joi.alternatives().try(
      Joi.string(), 
      Joi.object()  
    )
  ).optional().messages({
    "object.base": '"params.uk" must be an object',
  }),
  ru: Joi.object().pattern(
    Joi.string(),
    Joi.alternatives().try(
      Joi.string(), 
      Joi.object()  
    )
  ).optional().messages({
    "object.base": '"params.ru" must be an object',
  }),
  images: Joi.array().items(Joi.string()).optional().messages({
    "array.base": '"images" must be an array',
    "string.uri": '"images" must contain valid URIs',
  }),
}).optional(),
});