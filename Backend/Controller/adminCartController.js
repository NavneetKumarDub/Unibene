// Admin Cart Controller

const Cart = require("../models/cartModel");

// Get all carts (Admin)
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("user", "name email")   // user info
      .populate("items.productId");     // product info

    res.status(200).json({ data: carts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch carts" });
  }
};

// Get single user cart (Admin)
const getUserCartByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.productId");

    if (!cart) return res.status(200).json({ userId, items: [] });

    // remove invalid products
    const items = cart.items.filter(i => i.productId);

    res.status(200).json({ userId, items });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user cart" });
  }
};

module.exports = { getAllCarts, getUserCartByAdmin };
