import Joi from "joi";

export const contactAddSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': 'Name must be a string.',
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 3 characters long.',
      'string.max': 'Name must not exceed 30 characters.',
      'any.required': 'Name is a required field.',
    }),
  phoneNumber: Joi.string()
    .min(3)
    .max(13)
    .required()
    .messages({
      'string.base': 'Phone number must be a string.',
      'string.empty': 'Phone number is required.',
      'string.min': 'Phone number must be at least 3 characters long.',
      'string.max': 'Phone number must not exceed 13 characters.',
      'any.required': 'Phone number is a required field.',
    }),
  email: Joi.string()
    .email()
    .messages({
      'string.base': 'Email must be a string.',
      'string.email': 'Email must be a valid email address.',
      'string.empty': 'Email cannot be empty.',
    }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be a boolean.',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'Contact type must be a string.',
      'any.only': 'Contact type must be one of the following: work, home, personal.',
      'any.required': 'Contact type is a required field.',
    }),
});

export const contactUpdateSchema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .messages({
        'string.base': 'Name must be a string.',
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name must not exceed 30 characters.',
      }),
    phoneNumber: Joi.string()
      .min(3)
      .max(13)
      .messages({
        'string.base': 'Phone number must be a string.',
        'string.min': 'Phone number must be at least 3 characters long.',
        'string.max': 'Phone number must not exceed 13 characters.',
      }),
    email: Joi.string()
      .email()
      .messages({
        'string.base': 'Email must be a string.',
        'string.email': 'Email must be a valid email address.',
      }),
    isFavourite: Joi.boolean().messages({
      'boolean.base': 'isFavourite must be a boolean.',
    }),
    contactType: Joi.string()
      .valid('work', 'home', 'personal')
      .messages({
        'string.base': 'Contact type must be a string.',
        'any.only': 'Contact type must be one of the following: work, home, personal.',
      }),
  }).min(1).messages({
    'object.min': 'At least one field must be provided for updating the contact.',
  });

