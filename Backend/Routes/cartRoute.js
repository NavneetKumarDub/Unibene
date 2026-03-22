// Cart Routes

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addCart,
  getAllCart,
  deleteCart,
} = require("../Controller/cartController");

const router = express.Router();

// Add item to cart
router.post("/add", authMiddleware, addCart);

// Get user cart
router.get("/", authMiddleware, getAllCart);

// Remove item from cart
router.delete("/:productId", authMiddleware, deleteCart);

module.exports = router;
