const Software = require("../models/softwareModel");

const getSoftwarePage = async (req, res) => {
  try {
    
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    
    let filter = {};
    if (req.query.category && req.query.category !== "") {
      filter.category = req.query.category;
    }
    
    let sort = {};
    if (req.query.sort === "discountHigh") {
      sort = { discountPercent: -1 };
    }
    if (req.query.sort === "priceLow") {
      sort = { discountPrice: 1 };
    }
    if (req.query.sort === "priceHigh") {
      sort = { discountPrice: -1 };
    }

    // Fetch paginated technology products
    const softwares = await Software.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Count total documents for pagination metadata
    const total = await Software.countDocuments(filter);

    // Send paginated response
    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      data: softwares,
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: "Error fetching data" });
  }
};

const getAllSoftware = async (req, res) => {
  try {
    const softwares = await Software.find();

    res.status(200).json({
      count: softwares.length,
      data: softwares,
    });
  } catch (error) {
    console.error("Failed to fetch software:", error);
    res.status(500).json({ message: "Failed to fetch software products" });
  }
};

const getSoftware = async (req, res) => {
  try {
    const { id } = req.params;

    const software = await Software.findOne({
      _id: id,
    });

    if (!software) {
      return res.status(404).json({
        message: "Software not found or inactive",
      });
    }

    res.status(200).json({
      data: software,
    });
  } catch (error) {
    console.error("Failed to fetch software:", error);
    res.status(500).json({
      message: "Failed to fetch software",
    });
  }
};



const createSoftware = async (req, res) => {
  try {
    console.log("inside create Software");
    const software = await Software.create(req.body);
    res.status(201).json({ data: software });
  } catch (err) {
    res.status(500).json({ message: "Failed to create software" });
  }
};


const getAllSoftwareAdmin = async (req, res) => {
  try {
    const softwares = await Software.find();

    res.status(200).json({
      count: softwares.length,
      data: softwares,
    });
  } catch (error) {
    console.error("Failed to fetch software (admin):", error);
    res.status(500).json({ message: "Failed to fetch software products" });
  }
};


const updateSoftware = async (req, res) => {
  try {
    const { id } = req.params;

    const software = await Software.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!software) {
      return res.status(404).json({ message: "Software not found" });
    }

    res.status(200).json({
      message: "Software updated successfully",
      data: software,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update software" });
  }
};

module.exports = {
  getAllSoftware,
  getSoftware,
  createSoftware,
  getAllSoftwareAdmin,
  updateSoftware,
  getSoftwarePage,
};
