// Admin Cart Routes

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleWare");
const {
  getAllCarts,
  getUserCartByAdmin,
} = require("../Controller/adminCartController");

const router = express.Router();

// Get all carts (Admin)
router.get("/carts", authMiddleware, adminMiddleware, getAllCarts);

// Get single user cart (Admin)
router.get("/cart/:userId", authMiddleware, adminMiddleware, getUserCartByAdmin);

module.exports = router;
