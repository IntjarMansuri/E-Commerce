import { Router } from "express";
import {
  login,
  signup,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import passport from "passport";

const router = Router();

// "http://localhost:7000/api/user/"

router.route("/login").get(login);
router.route("/register").get(signup).post(registerUser);

router
  .route(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    })
  )
  .post(loginUser);

router.route("/logout").get(logoutUser);

export default router;
