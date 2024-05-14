import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createReview = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;

    const newReview = new Review(req.body);
    await newReview.save();

    const product = await Product.findById(productId);
    const newAvgRating =
      (product.avgRating * product.reviews.length + parseInt(req.body.rating)) /
      (product.reviews.length + 1);
    product.avgRating = parseFloat(newAvgRating.toFixed(1));
    product.reviews.push(newReview);

    await product.save();
    await newReview.save();

    req.flash("success", "Added your comment succesfully!");
    res.redirect("back");
  } catch (e) {
    req.flash("reject", "You need to login first!");
  }
});

export { createReview };
