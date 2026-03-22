const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // 👈 username must be unique
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"]
    },
    profileImg: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      default: "user"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
