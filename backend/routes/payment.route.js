import express from "express";
import { protectRoute } from "../middleware/security.middleware.js";
import {
  createCheckoutSession,
  checkoutSucess,
} from "../controller/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-sucess", protectRoute, checkoutSucess);
export default router;
