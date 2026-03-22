
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectionDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.username}:${process.env.password}@unibene.oybxtpb.mongodb.net/unibene`
    );
    console.log("Conncted to DB...");
  } catch (error) {
    console.log("Something went wrong");
  }
};

module.exports = connectionDb;