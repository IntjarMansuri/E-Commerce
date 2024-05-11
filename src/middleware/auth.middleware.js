import { Product } from "../models/product.model.js";

export const isLoggedIn = (req, res, next) => {
  if (req.xhr && !req.isAuthenticated()) {
    return res.status(401).json({
      msg: "Please Login first",
    });
  }

  if (!req.isAuthenticated()) {
    req.flash("reject", "Please Log in first!!");
    return res.redirect("/api/user/login");
  }
  next();
};

export const isSeller = (req, res, next) => {
  if (req.user.role === "buyer") {
    req.flash("reject", "You are not authorized to do this!");
    return res.redirect("back");
  }
  next();
};

export const isProductAuthor = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product.author || !product.author.equals(req.user._id)) {
    req.flash("reject", "You are not authorized to do that!");
    return req.redirec("back");
  }
  next();
};
