// Course seeding script

const mongoose = require("mongoose");
require("dotenv").config();

const Course = require("../models/courseSchema");
const { courseData } = require("../../Frontend/src/data/courseData");

// connect DB
mongoose.connect(process.env.URI);

// seed courses
const seedCourses = async () => {
  try {
    await Course.deleteMany(); // clear old data

    const cleanData = courseData.map(({ _id, ...rest }) => rest); // remove _id
    await Course.insertMany(cleanData);

    console.log("Courses seeded");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedCourses();
