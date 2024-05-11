import { Router } from "express";
import {
  addCart,
  deleteItem,
  removeCart,
  showCart,
} from "../controllers/cart.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

// "http://localhost:7000/api/user/"

router.route("/:productId/add").post(isLoggedIn, addCart);

router.route("/cart").get(isLoggedIn, showCart);

router.route("/:productId/remove").post(isLoggedIn, removeCart);

router.route("/:productId").delete(isLoggedIn, deleteItem);

export default router;
