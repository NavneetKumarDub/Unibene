// Course Routes

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleWare");
const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursePage,
} = require("../Controller/courseController");

const router = express.Router();

// Public
router.get("/", getAllCourses);
router.get("/page", getCoursePage);
router.get("/course/:id", getCourse);

// Admin
router.post("/course/create", authMiddleware, adminMiddleware, createCourse);
router.put("/course/:id", authMiddleware, adminMiddleware, updateCourse);
router.delete("/course/:id", authMiddleware, adminMiddleware, deleteCourse);

module.exports = router;
