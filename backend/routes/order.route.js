import express from "express";
import {userOrders, updateOrderStatus, getAllProducts} from "../controller/order.controller.js";
import { adminRoute, protectRoute } from "../middleware/security.middleware.js";
const router = express.Router();

router.get("/", protectRoute, userOrders);

router.put("/:id", protectRoute, adminRoute, updateOrderStatus );

router.get("/all", protectRoute, adminRoute, getAllProducts);

export default router;
