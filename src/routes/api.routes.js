import { Router } from "express";
import { User } from "../models/user.model.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/about", (req, res) => {
  res.render("auth/about");
});

router.post("/:productId/like", isLoggedIn, async (req, res) => {
  const { productId } = req.params;
  const user = req.user;
  const isLike = req.user.wishlist.includes(productId);

  if (isLike) {
    req.user = await User.findByIdAndUpdate(
      user._id,
      { $pull: { wishlist: productId } },
      { new: true }
    );
  } else {
    req.user = await User.findByIdAndUpdate(
      user._id,
      {
        $addToSet: {
          wishlist: productId,
        },
      },
      { new: true }
    );
  }

  res.json({
    success: true,
  });
});

export default router;
