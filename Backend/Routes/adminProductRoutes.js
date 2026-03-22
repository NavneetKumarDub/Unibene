// Admin Product Routes

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleWare");
const {
  createProduct,
  getAllProducts,
  updateProduct,  
  deleteProduct,
} = require("../Controller/adminProductController");

const router = express.Router();

// Create product
router.post("/:type", authMiddleware, adminMiddleware, createProduct);

// Get products by type
router.get("/:type", authMiddleware, adminMiddleware, getAllProducts);

// Update product
router.put("/:type/:id", authMiddleware, adminMiddleware, updateProduct);

// Delete product
router.delete("/:type/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
