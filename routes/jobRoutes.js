const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getAllJobs,
  getSingleJob,
  addJob,
  updateJob,
 deleteJob,
  getMatchScore,
} = require("../controllers/jobController");

// =========================
// Public Routes
// =========================

// Get All Jobs
router.get("/", getAllJobs);

// =========================
// AI Match Score
// =========================
router.get(
  "/match/:id",
  protect,
  getMatchScore
);

// Get Single Job
router.get("/:id", getSingleJob);

// =========================
// Admin Routes
// =========================

// Add Job
router.post(
  "/add",
  protect,
  adminOnly,
  addJob
);

// Update Job
router.put(
  "/:id",
  protect,
  adminOnly,
  updateJob
);

// Delete Job
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteJob
);

module.exports = router;