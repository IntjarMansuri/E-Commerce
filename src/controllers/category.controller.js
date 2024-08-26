import { Category } from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.find({});
    res.render("category/index", { category });
  } catch (e) {
    res.render("error", { error: e.message });
  }
});

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { title, images } = req.body;

    if (!title || !images) {
      req.flash("reject", "All fields are required");
      res.render("category/index");
    }

    const category = await Category.create({
      title,
      images,
    });

    req.flash("success", `Category ${category} created successfully!`);
    res.redirect(`/api/category`);
  } catch (e) {
    res.render("error", { error: e.message });
  }
});

const editCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      req.flash("reject", "Category not found!");
      return res.redirect(`/api/category`);
    }

    res.render("category/edit", { category });
  } catch (error) {
    res.render("error", { error: error.message });
  }
});

const updatedCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, images } = req.body;

    if (!title || !images) {
      req.flash("reject", "All fields are required");
      return res.redirect(`/api/category/${id}/edit`);
    }

    await Category.findByIdAndUpdate(
      id,
      {
        title,
        images,
      },
      { new: true }
    );

    req.flash("success", "Category updated successfully!");
    res.redirect(`/api/category`);
  } catch (e) {
    res.render("error", { error: e.message });
  }
});

export { createCategory, getAllCategory, editCategory, updatedCategory };
