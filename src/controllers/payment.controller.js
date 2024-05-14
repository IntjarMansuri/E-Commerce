import Razorpay from "razorpay";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/order.model.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

const createOrder = asyncHandler(async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const { amount } = req.body;

  const options = {
    amount: parseInt(amount) * 100,
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  await Order.create({
    _id: order.id,
    user: req.user._id,
    amount: parseInt(amount),
  });

  res.json({
    success: true,
    order: {
      id: order.id,
      amount: parseInt(amount),
    },
  });
});

const paymentVerify = asyncHandler(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const isValid = validatePaymentVerification(
    {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
    },
    razorpay_signature,
    process.env.RAZORPAY_KEY_SECRET
  );

  if (isValid) {
    await Order.findByIdAndUpdate(
      { _id: razorpay_order_id },
      { paymentStatus: true }
    );

    req.flash("success", "Payment Sucessful!");
  } else {
    req.flash("reject", "Not a valid payment!");
  }

  res.redirect("back");
});

export { createOrder, paymentVerify };
