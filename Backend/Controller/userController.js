// Auth Controller

const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User signup
const signUp = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    if (!name || !email || !password || !gender)
      return res.status(400).json({ message: "All fields required" });

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      gender,
      password: await bcrypt.hash(password, 10),
      role: "user",
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ message: "Signup successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User signin
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get current user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const { name, oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // update name
    if (name && name !== user.name) {
      if (await User.findOne({ name }))
        return res.status(400).json({ message: "Username taken" });
      user.name = name;
    }

    // update password
    if (newPassword) {
      if (!oldPassword)
        return res.status(400).json({ message: "Old password required" });

      if (!(await bcrypt.compare(oldPassword, user.password)))
        return res.status(401).json({ message: "Old password incorrect" });

      user.password = await bcrypt.hash(newPassword, 10);
    }

    // update profile image
    if (req.file) user.profileImg = `/uploads/profile/${req.file.filename}`;

    await user.save();

    res.status(200).json({
      message: "Profile updated",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        role: user.role,
        profileImg: user.profileImg,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signUp, signIn, getUser, updateProfile };
