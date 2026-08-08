const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  sendMessage,
  getMyMessages,
  markAsRead,
} = require("../controllers/messageController");

// =========================
// Send Message
// =========================
router.post("/send", protect, sendMessage);

// =========================
// Get My Messages
// =========================
router.get("/", protect, getMyMessages);

// =========================
// Mark Message As Read
// =========================
router.put("/:id/read", protect, markAsRead);

module.exports = router;