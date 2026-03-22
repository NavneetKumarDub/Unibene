// Search Controller

const Course = require("../models/courseSchema");
const Technology = require("../models/technologySchema");
const Software = require("../models/softwareModel");

// Search across all products
const searchAll = async (req, res) => {
  try {
    const q = req.query.q?.trim();
    if (!q) return res.status(200).json({ data: [] }); // empty query

    const [courses, technologies, softwares] = await Promise.all([
      Course.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: "textScore" } }),
      Technology.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: "textScore" } }),
      Software.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: "textScore" } }),
    ]);

    const data = [
      ...courses.map(i => ({ ...i._doc, type: "course" })),
      ...technologies.map(i => ({ ...i._doc, type: "technology" })),
      ...softwares.map(i => ({ ...i._doc, type: "software" })),
    ];

    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: "Search failed" });
  }
};

// Get all products (merged)
const getAllProducts = async (req, res) => {
  try {
    const [courses, technologies, softwares] = await Promise.all([
      Course.find(),
      Technology.find(),
      Software.find(),
    ]);

    const data = [
      ...courses.map(i => ({ ...i._doc, type: "course" })),
      ...technologies.map(i => ({ ...i._doc, type: "technology" })),
      ...softwares.map(i => ({ ...i._doc, type: "software" })),
    ];

    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

const getAllProductsPage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const { sort, type } = req.query;

    let merged = [];

    if (!type || type === "technology") {
      const technologies = await Technology.find();
      merged.push(
        ...technologies.map(i => ({ ...i._doc, type: "technology" }))
      );
    }

    if (!type || type === "course") {
      const courses = await Course.find();
      merged.push(
        ...courses.map(i => ({ ...i._doc, type: "course" }))
      );
    }

    if (!type || type === "software") {
      const softwares = await Software.find();
      merged.push(
        ...softwares.map(i => ({ ...i._doc, type: "software" }))
      );
    }

    if (sort === "discountHigh") {
      merged.sort(
        (a, b) => (b.discountPercent || 0) - (a.discountPercent || 0)
      );
    }

    if (sort === "priceLow") {
      merged.sort(
        (a, b) => (a.discountPrice || 0) - (b.discountPrice || 0)
      );
    }

    if (sort === "priceHigh") {
      merged.sort(
        (a, b) => (b.discountPrice || 0) - (a.discountPrice || 0)
      );
    }

    const total = merged.length;
    const paginatedData = merged.slice(skip, skip + limit);

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      data: paginatedData,
    });
  } catch (error) {
    console.error("All products page failed:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

module.exports = {
  searchAll,
  getAllProducts,
  getAllProductsPage,
};
