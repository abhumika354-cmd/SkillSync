const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  applyJob,
  getMyApplications,
  getApplicantsByJob,
  updateApplicationStatus,
  withdrawApplication,
} = require("../controllers/applicationController");

// =========================
// Apply Job
// =========================
router.post(
  "/apply",
  protect,
  applyJob
);

// =========================
// Get My Applications
// =========================
router.get(
  "/my-applications",
  protect,
  getMyApplications
);

// =========================
// Admin - Get Applicants By Job
// =========================
router.get(
  "/job/:jobId",
  protect,
  adminOnly,
  getApplicantsByJob
);

// =========================
// Admin - Update Application Status
// =========================
router.put(
  "/:id",
  protect,
  adminOnly,
  updateApplicationStatus
);

// =========================
// Student - Withdraw Application
// =========================
router.patch(
  "/:id/withdraw",
  protect,
  withdrawApplication
);

module.exports = router;