// Technology Controller

const Technology = require("../models/technologySchema");

// Get all technologies
const getAllTechnologies = async (req, res) => {
  try {
    const tech = await Technology.find();
    res.status(200).json({ count: tech.length, data: tech });
  } catch {
    res.status(500).json({ message: "Failed to fetch technologies" });
  }
};

// Get technologies with pagination, filter, sort
const getTechnologyPage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    const filter = req.query.category ? { category: req.query.category } : {};

    let sort = {};
    if (req.query.sort === "discountHigh") sort = { discountPercent: -1 };
    if (req.query.sort === "priceLow") sort = { discountPrice: 1 };
    if (req.query.sort === "priceHigh") sort = { discountPrice: -1 };

    const data = await Technology.find(filter).sort(sort).skip(skip).limit(limit);
    const total = await Technology.countDocuments(filter);

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch {
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

// Get single technology
const getTechnology = async (req, res) => {
  try {
    const item = await Technology.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ data: item });
  } catch {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// Create technology
const createTechnology = async (req, res) => {
  try {
    const tech = await Technology.create(req.body);
    res.status(201).json({ data: tech });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update technology
const updateTechnology = async (req, res) => {
  try {
    const tech = await Technology.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tech) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Updated" });
  } catch {
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Delete technology
const deleteTechnology = async (req, res) => {
  try {
    const tech = await Technology.findByIdAndDelete(req.params.id);
    if (!tech) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

module.exports = {
  getAllTechnologies,
  getTechnology,
  getTechnologyPage,
  createTechnology,
  updateTechnology,
  deleteTechnology,
};
