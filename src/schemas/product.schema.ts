// Estos son los DTO
import Joi from "joi";

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(15);
const price = Joi.number().integer().min(10);

export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required()
});

export const updateProductSchema = Joi.object({
  name: name,
  price: price
});

export const getProductSchema = Joi.object({
  id: id.required()
});
