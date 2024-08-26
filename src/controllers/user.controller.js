import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const signup = (req, res) => {
  res.render("auth/register");
};

const login = (req, res) => {
  res.render("auth/login");
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, role, password } = req.body;

  if ([username, email, role, password].some((field) => field?.trim() === "")) {
    req.flash("reject", "All field are required!");
    return res.redirect("/api/user/register");
  }

  if (password.length < 5) {
    req.flash("reject", "Password must be at least 5 characters long!");
    return res.redirect("/api/user/register");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    req.flash("reject", "Email already registered!");
    return res.redirect("/api/user/register");
  }

  const user = await User.create({
    username,
    email,
    role,
    password,
  });

  req.flash("success", `Welcome ${user.username} You're all set to explore!`);
  res.redirect("/api/user/login");
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (password.length < 5) {
    req.flash("reject", "Password must be at least 5 characters long!");
    return res.redirect("/api/user/login");
  }

  if (!user) {
    req.flash("reject", "User does not exist!");
    return res.redirect("/api/user/login");
  }

  req.login(user, (err) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    req.flash("success", `Welcome back ${req.user.username}! Happy shopping `);
    res.redirect("/api/products");
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    req.flash("success", "See you soon");
    res.redirect("/api/products");
  });
});

export { signup, login, registerUser, loginUser, logoutUser };
