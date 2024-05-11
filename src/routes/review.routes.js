import { Router } from "express";
import { createReview } from "../controllers/review.controller.js";
import { validateReview } from "../middleware/validation.middleware.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

// "http://localhost:7000/api/products/ "
router
  .route("/:productId/review")
  .post(isLoggedIn, validateReview, createReview);

export default router;
