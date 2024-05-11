import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);

  const cartItem = user.cart.find((item) => {
    return item.productId.toString() === productId;
  });

  if (cartItem) {
    cartItem.quantity++;
  } else {
    user.cart.push({ productId });
  }

  await user.save();
  req.flash("success", "Item has been added to your cart successfully");
  res.redirect("back");
});

const showCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate("cart.productId");

  let totalAmount = 0;
  user.cart.forEach((item) => {
    totalAmount += item.quantity * item.productId.price;
  });

  res.render("cart/index", { user, totalAmount });
});

const removeCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);

  const cartItem = user.cart.find((item) => {
    return item.productId.toString() === productId;
  });

  if (cartItem && cartItem.quantity > 1) {
    cartItem.quantity--;
  }

  await user.save();
  res.redirect("back");
});

const deleteItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);

  const itemIndex = user.cart.findIndex((item) => {
    return item.productId.toString() === productId;
  });

  if (itemIndex !== -1) {
    user.cart.splice(itemIndex, 1);
  }

  await user.save();
  res.redirect("back");
});

export { addCart, showCart, removeCart, deleteItem };
