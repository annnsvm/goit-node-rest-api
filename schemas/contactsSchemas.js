import Joi from 'joi';

export const createContactSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});
