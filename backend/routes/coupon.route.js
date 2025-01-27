import express from "express";
import { protectRoute } from "../middleware/security.middleware.js";
import { getCoupon, validateCoupon } from "../controller/coupon.controller.js";

const router = express.Router();

router.post("/validate", protectRoute, validateCoupon)
router.get("/", protectRoute, getCoupon);


export default router;
