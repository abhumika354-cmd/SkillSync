const Job = require("../models/Job");

// =========================
// Get All Jobs + Search
// =========================
exports.getAllJobs = async (req, res) => {
  try {

    const { keyword } = req.query;

    let filter = {};

    if (keyword) {
      filter = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { company: { $regex: keyword, $options: "i" } },
          { location: { $regex: keyword, $options: "i" } },
        ],
      };
    }

    const jobs = await Job.find(filter);

    res.status(200).json({
      success: true,
      jobs,
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
// Add New Job
// =========================
exports.addJob = async (req, res) => {
  try {

    const {
      company,
      title,
      location,
      salary,
      type,
      description,
      skills,
    } = req.body;

    const job = await Job.create({
      company,
      title,
      location,
      salary,
      type,
      description,
      skills,
    });

    res.status(201).json({
      success: true,
      message: "Job Added Successfully",
      job,
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
// Get Single Job
// =========================
exports.getSingleJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
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
// Delete Job
// =========================
exports.deleteJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job Deleted Successfully",
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
// Update Job
// =========================
exports.updateJob = async (req, res) => {
  try {

    const {
      company,
      title,
      location,
      salary,
      type,
      description,
      skills,
    } = req.body;

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.company = company;
    job.title = title;
    job.location = location;
    job.salary = salary;
    job.type = type;
    job.description = description;
    job.skills = skills;

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job Updated Successfully",
      job,
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
// AI Match Score
// =========================
exports.getMatchScore = async (req, res) => {
  try {

    const User = require("../models/User");

    const job = await Job.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Normalize Skills
    const userSkills = (user.skills || []).map(skill =>
      skill
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\./g, "")
    );

    const requiredSkills = (job.skills || []).map(skill =>
      skill
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\./g, "")
    );

    const matchedSkills = requiredSkills.filter(skill =>
      userSkills.includes(skill)
    );

    const missingSkills = requiredSkills.filter(skill =>
      !userSkills.includes(skill)
    );

    // Debug
    console.log("=================================");
    console.log("USER SKILLS:", userSkills);
    console.log("JOB SKILLS:", requiredSkills);
    console.log("MATCHED:", matchedSkills);
    console.log("MISSING:", missingSkills);
    console.log("=================================");

    const score =
      requiredSkills.length === 0
        ? 0
        : Math.round(
            (matchedSkills.length / requiredSkills.length) * 100
          );

    res.status(200).json({
      success: true,
      score,
      matchedSkills,
      missingSkills,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};