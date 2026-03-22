const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleWare");
const upload = require("../middleware/multer");
const express = require("express");
const {
  getAllTechnologies,
  getTechnology,
  createTechnology,
  updateTechnology,
  deleteTechnology,
  getTechnologyPage,
} = require("../Controller/technologyController");

const router = express.Router();

router.get("/", getAllTechnologies);
router.get("/page",getTechnologyPage);
router.get("/:id", getTechnology);
router.post("/createtech",authMiddleware, adminMiddleware,createTechnology);
router.put("/:id", authMiddleware, adminMiddleware, updateTechnology);
router.delete("/:id", authMiddleware, adminMiddleware, deleteTechnology);
module.exports = router;
