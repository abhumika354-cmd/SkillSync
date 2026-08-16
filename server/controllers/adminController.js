const User = require("../models/user");
const Job = require("../models/Job");
const Application = require("../models/Application");

// =========================
// Admin Dashboard Analytics
// =========================
exports.getDashboardStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalJobs = await Job.countDocuments();

    const totalApplications = await Application.countDocuments();

    const totalResumes = await User.countDocuments({
      resume: { $ne: "" },
    });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalJobs,
        totalApplications,
        totalResumes,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};