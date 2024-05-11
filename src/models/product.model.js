import mongoose, { Schema } from "mongoose";
import { Review } from "./review.model.js";

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    maxRetailPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "clothes",
        "electronics",
        "smartphones",
        "beauty",
        "kitchen",
        "shoes",
      ],
    },

    images: {
      type: [String],
      required: true,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

productSchema.post("findOneAndDelete", async (product) => {
  if (product.reviews.length > 0) {
    await Review.deleteMany({ _id: { $in: product.reviews } });
  }
});

export const Product = mongoose.model("Product", productSchema);
