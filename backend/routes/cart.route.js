import express from "express";
import { protectRoute } from "../middleware/security.middleware.js";
import {
  getCartItems,
  addToCart,
  removeProductFromCart,
  updateQuantity,
} from "../controller/cart.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCartItems);
router.post("/", protectRoute, addToCart);
router.delete("/:id", protectRoute, removeProductFromCart);
router.put("/:id", protectRoute, updateQuantity);

export default router;
