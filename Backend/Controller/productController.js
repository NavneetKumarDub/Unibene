const Product = require("../models/productModel");

// ADMIN: Create product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      image,
      createdBy: req.user.id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Update product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
};
