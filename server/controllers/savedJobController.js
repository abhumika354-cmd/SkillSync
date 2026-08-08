const SavedJob = require("../models/SavedJob");

// =========================
// Save Job
// =========================
exports.saveJob = async (req, res) => {
  try {

    const { jobId } = req.body;

    const alreadySaved = await SavedJob.findOne({
      student: req.user._id,
      job: jobId,
    });

    if (alreadySaved) {
      return res.status(400).json({
        success: false,
        message: "Job already saved",
      });
    }

    const savedJob = await SavedJob.create({
      student: req.user._id,
      job: jobId,
    });

    res.status(201).json({
      success: true,
      message: "Job Saved Successfully",
      savedJob,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// =========================
// Get Saved Jobs
// =========================
exports.getSavedJobs = async (req, res) => {
  try {

    const savedJobs = await SavedJob.find({
      student: req.user._id,
    }).populate("job");

    res.status(200).json({
      success: true,
      savedJobs,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// =========================
// Remove Saved Job
// =========================
exports.removeSavedJob = async (req, res) => {
  try {

    await SavedJob.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Removed from Saved Jobs",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};