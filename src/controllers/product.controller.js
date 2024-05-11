import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("products/index", { products });
  } catch (e) {
    res.render("error", { err: e.message });
  }
});

const addProduct = asyncHandler(async (req, res) => {
  try {
    // const { name, description, price, maxRetailPrice, category, images } =
    //   req.body;
    await Product.create({ ...req.body, author: req.user._id });

    req.flash("success", "Product added succesfully!");
    res.redirect("/api/products");
  } catch (e) {
    res.render("error", { err: e.message });
  }
});

const productByCategory = asyncHandler(async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();

    const allowedCategories = [
      "clothes",
      "electronics",
      "smartphones",
      "beauty",
      "kitchen",
      "shoes",
    ];

    if (!allowedCategories.includes(category)) {
      throw new ApiError(404, "Invalid category type");
    }

    const data = await Product.find({ category });

    res
      .status(201)
      .json(new ApiResponse(200, data, "Product fetched successfully!"));
  } catch (e) {
    res.render("error", { err: e.message });
  }
});

const newProduct = asyncHandler(async (req, res) => {
  try {
    res.render("products/new");
  } catch (e) {
    res.render("error", { err: e.message });
  }
});

const showProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("reviews");

    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    res.render("products/show", { product });
  } catch (e) {
    res.render("error", { err: e.message });
  }
});

const editProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product });
  } catch (e) {
    res.render("error", { err: e.message });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, req.body);
    req.flash("success", "Updated product successfully!");
    res.redirect(`/api/products/${id}`);
  } catch (e) {
    req.flash("reject", "Error while product updated!");
    res.render("error", { err: e.message });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);
    req.flash("success", "Product deleted successfully!");
    res.redirect("/api/products");
  } catch (e) {
    res.render("error", { err: e.message });
  }
});

export {
  getAllProducts,
  addProduct,
  productByCategory,
  newProduct,
  showProduct,
  editProduct,
  updateProduct,
  deleteProduct,
};
