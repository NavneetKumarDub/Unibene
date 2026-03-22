const mongoose = require("mongoose");

const { Schema } = mongoose;

const technologySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  originalPrice: {
    type: Number,
    required: true,
  },

  discountPrice: {
    type: Number,
    required: true,
  },

  discountPercent: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
  },
  category: {
    type: String,
    enum: [
      "laptop",
      "mobile",
      "accessory",
      "tablet",
      "monitor",
      "audio",
      "gaming",
      "smartwatch",
    ],
  },

  source: {
    type: String,
    required: true,
  },

  expiresAt: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

technologySchema.index({ name: "text", brand: "text", category: "text" });
module.exports = mongoose.model("Technology", technologySchema);
