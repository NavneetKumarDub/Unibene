const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },

  originalPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  discountPercent: { type: Number, required: true },

  image: { type: String, required: true },
  link: { type: String, required: true },

  brand: { type: String },

  categoy: {
    type: String,
    enum: [
      "programming",
      "data_science",
      "ai_ml",
      "web_development",
      "mobile_development",
      "cybersecurity",
      "cloud_computing",
      "design",
      "business",
      "marketing",
      "finance",
      "productivity",
      "language_learning",
      "personal_development",
      "exam_prep"
    ],
    required: true
  },

  source: { type: String, required: true },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  expiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

courseSchema.index({ name: "text", category: "text" });

module.exports = mongoose.model("Course", courseSchema);
