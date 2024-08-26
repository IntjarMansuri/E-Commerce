import { Router } from "express";

import { isLoggedIn, isSeller } from "../middleware/auth.middleware.js";
import {
  createCategory,
  editCategory,
  getAllCategory,
  updatedCategory,
} from "../controllers/category.controller.js";

const router = Router();

// "http://localhost:7000/api/category/"

router.route("/").post(isLoggedIn, isSeller, createCategory);

router.route("/").get(isLoggedIn, isSeller, getAllCategory);

router.route("/:id/edit").get(isLoggedIn, isSeller, editCategory);

router.route("/:id").patch(isLoggedIn, isSeller, updatedCategory);

export default router;
