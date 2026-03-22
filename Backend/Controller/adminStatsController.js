const User = require("../models/userSchema");
const Technology = require("../models/technologySchema");
const Course = require("../models/courseSchema");
const Software = require("../models/softwareModel");
const Cart = require("../models/cartModel");

const getAdminStats = async (req, res) => {
  try {
    const [
      totalUsers,
      techCount,
      courseCount,
      softwareCount,
      activeCarts,
    ] = await Promise.all([
      User.countDocuments(),
      Technology.countDocuments(),
      Course.countDocuments(),
      Software.countDocuments(),
      Cart.countDocuments({ "items.0": { $exists: true } }),
    ]);

    res.status(200).json({
      data: {
        totalUsers,
        totalProducts: techCount + courseCount + softwareCount,
        activeCarts,
        techCount,
        courseCount,
        softwareCount,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Failed to load admin stats" });
  }
};

module.exports = { getAdminStats };
