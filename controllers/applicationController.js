const Application = require("../models/Application");
const Job = require("../models/Job");

// =========================
// Apply for Job
// =========================
exports.applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check if already applied
    const alreadyApplied = await Application.findOne({
      student: req.user._id,
      job: jobId,
    });

    // Allow applying again only if previous application was withdrawn
    if (alreadyApplied && alreadyApplied.status !== "Withdrawn") {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // If previous application was withdrawn, activate it again
    if (alreadyApplied && alreadyApplied.status === "Withdrawn") {
      alreadyApplied.status = "Applied";
      await alreadyApplied.save();

      return res.status(200).json({
        success: true,
        message: "Job Applied Successfully",
        application: alreadyApplied,
      });
    }

    // Create new application
    const application = await Application.create({
      student: req.user._id,
      job: jobId,
      status: "Applied",
    });

    res.status(201).json({
      success: true,
      message: "Job Applied Successfully",
      application,
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
// Get My Applications
// =========================
exports.getMyApplications = async (req, res) => {
  try {

    // Only return active applications
    // Withdrawn applications will NOT be counted
    const applications = await Application.find({
      student: req.user._id,
      status: { $ne: "Withdrawn" },
    }).populate("job");

    res.status(200).json({
      success: true,
      applications,
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
// Get Applicants By Job (Admin)
// =========================
exports.getApplicantsByJob = async (req, res) => {
  try {

    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate(
        "student",
        "fullName email college skills resume"
      )
      .populate(
        "job",
        "title company"
      );

    res.status(200).json({
      success: true,
      applications,
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
// Update Application Status (Admin)
// =========================
exports.updateApplicationStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application Status Updated",
      application,
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
// Withdraw Application
// =========================
exports.withdrawApplication = async (req, res) => {
  try {

    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Make sure this application belongs to logged-in student
    if (
      application.student.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to withdraw this application",
      });
    }

    // Already withdrawn
    if (application.status === "Withdrawn") {
      return res.status(400).json({
        success: false,
        message: "Application is already withdrawn",
      });
    }

    // Withdraw application
    application.status = "Withdrawn";

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application withdrawn successfully",
      application,
    });

  } catch (error) {

    console.error(
      "Withdraw application error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to withdraw application",
    });
  }
};