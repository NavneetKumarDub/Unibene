// Cart Controller

const mongoose = require("mongoose");
const Cart = require("../models/cartModel");

// Add product to cart
const addCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, productType } = req.body;

    // validate inputs
    if (!mongoose.Types.ObjectId.isValid(productId))
      return res.status(400).json({ message: "Invalid productId" });

    const allowedTypes = ["Technology", "Course", "Software"];
    if (!allowedTypes.includes(productType))
      return res.status(400).json({ message: "Invalid productType" });

    let cart = await Cart.findOne({ user: userId });

    // create cart if not exists
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ productId, productType, quantity: 1 }],
      });
      return res.status(200).json({ message: "Item added", data: cart });
    }

    // update quantity or add new item
    const item = cart.items.find(
      i => i.productId.toString() === productId && i.productType === productType
    );

    item ? item.quantity++ : cart.items.push({ productId, productType, quantity: 1 });
    await cart.save();

    res.status(200).json({ message: "Item added", data: cart });
  } catch {
    res.status(500).json({ message: "Add cart failed" });
  }
};

// Get user cart
const getAllCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("items.productId");

    if (!cart) return res.status(200).json({ data: [] });

    // remove deleted products
    const items = cart.items.filter(i => i.productId);
    res.status(200).json({ data: items });
  } catch {
    res.status(500).json({ message: "Fetch cart failed" });
  }
};

// Remove item from cart
const deleteCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res.status(400).json({ message: "Invalid productId" });

    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { items: { productId } } }
    );

    res.status(200).json({ message: "Item removed" });
  } catch {
    res.status(500).json({ message: "Remove failed" });
  }
};

module.exports = { addCart, getAllCart, deleteCart };
