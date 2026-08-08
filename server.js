const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// =========================
// Load Environment Variables
// =========================
dotenv.config();

// =========================
// Import Config
// =========================
const connectDB = require("./config/db");

// =========================
// Import Routes
// =========================
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");
const adminRoutes = require("./routes/adminRoutes");
const messageRoutes = require("./routes/messageRoutes");

// =========================
// Connect Database
// =========================
connectDB();

const app = express();

// =========================
// Middlewares
// =========================
app.use(cors());
app.use(express.json());

// =========================
// Routes
// =========================
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/saved-jobs", savedJobRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/messages", messageRoutes);

// =========================
// Test Route
// =========================
app.get("/", (req, res) => {
  res.status(200).send("SkillSync Backend is Running 🚀");
});

// =========================
// Start Server
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 SkillSync Backend running on port ${PORT}`);
});