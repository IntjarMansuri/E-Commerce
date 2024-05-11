import { Router } from "express";
import {
  createOrder,
  paymentVerify,
} from "../controllers/payment.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

// "http://localhost:7000/api/payment/"
router.route("/order").post(isLoggedIn, createOrder);

router.route("/payment-verify").post(paymentVerify);

export default router;
