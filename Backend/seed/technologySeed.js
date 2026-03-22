// Technology seeding script

const mongoose = require("mongoose");
require("dotenv").config();

const Technology = require("../models/technologySchema");
const { techData } = require("../../Frontend/src/data/techData");

// connect DB
mongoose.connect(process.env.URI);

// seed technology
const seedTechnology = async () => {
  try {
    await Technology.deleteMany(); // clear old data

    const cleanData = techData.map(({ _id, ...rest }) => rest); // remove _id
    await Technology.insertMany(cleanData);

    console.log("Technology seeded");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedTechnology();
