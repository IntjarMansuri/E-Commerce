import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Populate user field with username
reviewSchema.methods.toJSON = function () {
  const review = this;
  const reviewObject = review.toObject();

  // Add username from the populated user object
  if (reviewObject.user.username) {
    reviewObject.user = reviewObject.user.username;
  }

  return reviewObject;
};

export const Review = mongoose.model("Review", reviewSchema);
