import { productSchema, reviewSchema } from "../utils/productValidation.js";

const validateProduct = (req, res, next) => {
  const { name, description, price, maxRetailPrice, category, images } =
    req.body;

  const { error } = productSchema.validate({
    name,
    description,
    price,
    maxRetailPrice,
    category,
    images,
  });

  if (error) {
    const msg = error.details.map((error) => error.message).join(",");

    return res.render("error", { error: msg });
  }
  next();
};

const validateReview = (req, res, next) => {
  const { rating, comment } = req.body;

  const { error } = reviewSchema.validate({ rating, comment });

  if (error) {
    const msg = error.details.map((error) => error.message).join(",");

    return res.render("error", { error: msg });
  }
  next();
};

export { validateProduct, validateReview };
