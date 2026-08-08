const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  updateProfile,
} = require("../controllers/authController");

// Test Route
router.get("/", (req, res) => {
  res.send("✅ Auth Route Working");
});

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get Logged-in User
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// Dashboard
router.get("/dashboard", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome ${req.user.email}`,
    data: {
      totalApplications: 0,
      savedJobs: 0,
      profileCompleted: false,
    },
  });
});

// Update Profile
router.put("/update-profile", protect, updateProfile);

module.exports = router;