const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  saveJob,
  getSavedJobs,
  removeSavedJob,
} = require("../controllers/savedJobController");

// =========================
// Save Job
// =========================
router.post("/save", protect, saveJob);

// =========================
// Get Saved Jobs
// =========================
router.get("/", protect, getSavedJobs);

// =========================
// Remove Saved Job
// =========================
router.delete("/:id", protect, removeSavedJob);

module.exports = router;