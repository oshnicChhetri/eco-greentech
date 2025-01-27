import express from "express";
import { protectRoute, adminRoute } from "../middleware/security.middleware.js";
import { paginate } from "../middleware/pagination.middleware.js";
import { getAllUsers } from "../controller/admin.controller.js";

const router = express.Router();

router.get("/users", protectRoute, adminRoute, getAllUsers);

export default router;
