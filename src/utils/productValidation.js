import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  maxRetailPrice: Joi.number().min(0).required(),
  category: Joi.string().required(),
  images: Joi.string().required(),
});

const reviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5),
  comment: Joi.string().required(),
});

export { productSchema, reviewSchema };
