const mongoose = require("mongoose");

const softwareSchema = new mongoose.Schema(
  {
    name: String,
    originalPrice: Number,
    discountPrice: Number,
    discountPercent: Number,
    brand: String,
    category: String,
    source: String,
    image: String,
    link: String,
  },
  { timestamps: true }
);

softwareSchema.index({ name: "text", brand: "text", category: "text" });
module.exports = mongoose.model("Software", softwareSchema);
