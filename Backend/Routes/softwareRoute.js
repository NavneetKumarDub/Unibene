const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleWare");

const {
  getAllSoftware,
  getSoftware,
  createSoftware,
  getAllSoftwareAdmin,
  updateSoftware,
  getSoftwarePage,
} = require("../Controller/softwareController");

const router = express.Router();

router.get("/page", getSoftwarePage);
router.get("/", getAllSoftware);
router.get("/:id", getSoftware);
router.get(
  "/admin/software",
  authMiddleware,
  adminMiddleware,
  getAllSoftwareAdmin
);
router.post("/admin/create", authMiddleware, adminMiddleware, createSoftware);
router.put("/admin/:id", authMiddleware, adminMiddleware, updateSoftware);

module.exports = router;
