// Admin Routes

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleWare");

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../Controller/adminController");

const { getAdminStats } = require("../Controller/adminStatsController");

const router = express.Router();

// Dashboard stats
router.get("/stats", authMiddleware, adminMiddleware, getAdminStats);

// Users
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/users/:id", authMiddleware, adminMiddleware, getUser);
router.put("/users/:id", authMiddleware, adminMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
