import { Router } from "express";
import {
  getAllProducts,
  addProduct,
  newProduct,
  showProduct,
  editProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { validateProduct } from "../middleware/validation.middleware.js";
import {
  isLoggedIn,
  isProductAuthor,
  isSeller,
} from "../middleware/auth.middleware.js";

const router = Router();

// "http://localhost:7000/api/products/"
router
  .route("/")
  .get(getAllProducts)
  .post(validateProduct, isSeller, addProduct);
router.route("/new").get(isLoggedIn, isSeller, newProduct);
router
  .route("/:id")
  .get(showProduct)
  .patch(isSeller, isProductAuthor, updateProduct)
  .delete(isLoggedIn, isSeller, isProductAuthor, deleteProduct);
router
  .route("/:id/edit")
  .get(isLoggedIn, isSeller, isProductAuthor, editProduct);

export default router;
