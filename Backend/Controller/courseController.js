// Course Controller

const Course = require("../models/courseSchema");

const getCoursePage = async (req, res) => {
  try {
    // Pagination configuration
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    // Build filter object dynamically
    let filter = {};
    if (req.query.category && req.query.category !== "") {
      filter.category = req.query.category;
    }

    // Build sorting rules dynamically
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

    const courses = await Course.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Course.countDocuments(filter);

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      data: courses,
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: "Error fetching data" });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ count: courses.length, data: courses });
  } catch {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// Get single course
const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ data: course });
  } catch {
    res.status(500).json({ message: "Failed to fetch course" });
  }
};

// Create course
const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ data: course });
  } catch {
    res.status(500).json({ message: "Failed to create course" });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ data: course });
  } catch {
    res.status(500).json({ message: "Failed to update course" });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete course" });
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursePage,
};
