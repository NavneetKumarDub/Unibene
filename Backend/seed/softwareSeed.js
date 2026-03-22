// Software seeding script

const mongoose = require("mongoose");
require("dotenv").config();

const Software = require("../models/softwareModel");
const { softwareData } = require("../../Frontend/src/data/softwareData");

// connect DB
mongoose.connect(process.env.URI);

// seed software
const seedSoftware = async () => {
  try {
    await Software.deleteMany(); // clear old data

    const cleanData = softwareData.map(({ _id, ...rest }) => rest); // remove _id
    await Software.insertMany(cleanData);

    console.log("Software seeded");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedSoftware();
