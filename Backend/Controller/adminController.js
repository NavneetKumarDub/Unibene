// Admin Controller: users + dashboard stats

const User = require("../models/userSchema");
const Technology = require("../models/technologySchema");
const Course = require("../models/courseSchema");
const Software = require("../models/softwareModel");
const Cart = require("../models/cartModel");

// Get all users (Admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.status(200).json({ data: users });
  } catch {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Get single user (Admin)
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ data: user });
  } catch {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

// Update user (Admin)
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ data: user });
  } catch {
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Delete user + cart (Admin)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await Cart.findOneAndDelete({ user: req.params.id }); // remove cart
    res.status(200).json({ message: "User deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// Admin dashboard stats
const getAdminStats = async (req, res) => {
  try {
    const [users, tech, courses, software, carts] = await Promise.all([
      User.countDocuments(),
      Technology.countDocuments(),
      Course.countDocuments(),
      Software.countDocuments(),
      Cart.countDocuments({ "items.0": { $exists: true } }), // non-empty carts
    ]);

    res.status(200).json({
      data: {
        totalUsers: users,
        totalProducts: tech + courses + software,
        activeCarts: carts,
      },
    });
  } catch {
    res.status(500).json({ message: "Failed to load admin stats" });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getAdminStats,
};
