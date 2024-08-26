import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("products/index", { products });
  } catch (e) {
    res.render("error", { error: e.message });
  }
});

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, maxRetailPrice, category, images } =
      req.body;

    if (
      !name ||
      !description ||
      !price ||
      !maxRetailPrice ||
      !category ||
      !images
    ) {
      req.flash("reject", "All fields are required");
      return res.redirect("/api/products/new");
    }

    await Product.create({
      name,
      description,
      price,
      maxRetailPrice,
      category,
      images,
      author: req.user._id,
    });

    req.flash("success", "Product added successfully!");
    res.redirect("/api/products");
  } catch (e) {
    res.render("error", { error: e.message });
  }
});

const newProduct = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("products/new", { categories });
  } catch (e) {
    res.render("error", { error: e.message });
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
    res.render("error", { error: e.message });
  }
});

const editProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");

    const categories = await Category.find({});

    res.render("products/edit", { product, categories });
  } catch (e) {
    res.render("error", { error: e.message });
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
    res.render("error", { error: e.message });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);
    req.flash("success", "Product deleted successfully!");
    res.redirect("/api/products");
  } catch (e) {
    res.render("error", { error: e.message });
  }
});

export {
  getAllProducts,
  addProduct,
  newProduct,
  showProduct,
  editProduct,
  updateProduct,
  deleteProduct,
};
