/**
 * Admin Product Controller
 *
 * Handles CRUD operations for:
 * - Technology
 * - Course
 * - Software
 */

const Technology = require("../models/technologySchema");
const Course = require("../models/courseSchema");
const Software = require("../models/softwareModel");

/**
 * Utility: Resolve model by product type
 */
const getModelByType = (type) => {
  switch (type) {
    case "technology":
      return Technology;
    case "course":
      return Course;
    case "software":
      return Software;
    default:
      return null;
  }
};

/**
 * ================================
 * CREATE PRODUCT
 * ================================
 * POST /api/admin/products/:type
 */
const createProduct = async (req, res) => {
  try {
    console.log("inside create product");
    const type = req.params.type.toLowerCase();
    const Model = getModelByType(type);

    if (!Model) {
      return res.status(400).json({ message: "Invalid product type" });
    }

    const product = await Model.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({ data: product });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * ================================
 * GET ALL PRODUCTS BY TYPE
 * ================================
 * GET /api/admin/products/:type
 */
const getAllProducts = async (req, res) => {
  try {
    const type = req.params.type.toLowerCase();
    const Model = getModelByType(type);

    if (!Model) {
      return res.status(400).json({ message: "Invalid product type" });
    }

    const products = await Model.find();
    res.status(200).json({ data: products });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * ================================
 * UPDATE PRODUCT
 * ================================
 * PUT /api/admin/products/:type/:id
 */
const updateProduct = async (req, res) => {
  try {
    const { type, id } = req.params;
    const Model = getModelByType(type.toLowerCase());

    if (!Model) {
      return res.status(400).json({ message: "Invalid product type" });
    }

    const updatedProduct = await Model.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ data: updatedProduct });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * ================================
 * DELETE PRODUCT
 * ================================
 * DELETE /api/admin/products/:type/:id
 */
const deleteProduct = async (req, res) => {
  try {
    const { type, id } = req.params;
    const Model = getModelByType(type.toLowerCase());

    if (!Model) {
      return res.status(400).json({ message: "Invalid product type" });
    }

    const deletedProduct = await Model.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
