// Auth & User Routes

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/profileUpload");
const {
  signUp,
  signIn,
  getUser,
  updateProfile,
} = require("../Controller/userController");

const router = express.Router();

// Auth
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/login", signIn); // alias

// User profile
router.get("/getUser", authMiddleware, getUser);
router.put(
  "/updateProfile",
  authMiddleware,
  upload.single("profileImg"),
  updateProfile
);

module.exports = router;
