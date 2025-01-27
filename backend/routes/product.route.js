import express from "express";
import { adminRoute, protectRoute } from "../middleware/security.middleware.js";
// import { paginate } from "../middleware/pagination.middleware.js";
import {
  getProductsByCategory,
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateStock,
  getFilteredProducts,
} from "../controller/product.controller.js";

const router = express.Router();

router.get("/category/:category", getProductsByCategory);
router.get("/product/:id", getProductById)
router.get("/", protectRoute, adminRoute, getAllProducts);
router.post("/", protectRoute, adminRoute, addProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.put("/:id", protectRoute, adminRoute, updateStock);
router.get("/filteredProducts/:query", getFilteredProducts);

export default router;
