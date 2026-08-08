import AdminCharts from "../components/AdminCharts";
import { getDashboardStats } from "../services/adminDashboardService";
import { useState, useEffect } from "react";
import {
  addJob,
  deleteJob,
  updateJob,
} from "../services/adminService";
import { getJobs } from "../services/jobService";
import "../styles/AdminDashboard.css";
import {
  getApplicantsByJob,
  updateApplicationStatus,
} from "../services/applicationAdminService";

function AdminDashboard() {

  const [job, setJob] = useState({
    company: "",
    title: "",
    location: "",
    salary: "",
    type: "",
    description: "",
    skills: "",
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
    totalResumes: 0,
  });

  const [jobs, setJobs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");

  // =========================
  // Load Jobs
  // =========================
  const fetchJobs = async () => {
    try {

      const res = await getJobs();

      setJobs(res.data.jobs);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchJobs();

    fetchDashboardStats();

  }, []);

  const fetchDashboardStats = async () => {

    try {

      const res = await getDashboardStats();

      setStats(res.data.stats);

    } catch (error) {

      console.log(error);

    }

  };

  // =========================
  // Input Change
  // =========================
  const handleChange = (e) => {

    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });

  };

  // =========================
  // Add Job
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = {
        ...job,
        skills: job.skills
          .split(",")
          .map(skill => skill.trim()),
      };

      const res = await addJob(data);

      alert(res.data.message);

      setJob({
        company: "",
        title: "",
        location: "",
        salary: "",
        type: "",
        description: "",
        skills: "",
      });

      fetchJobs();
      fetchDashboardStats();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };
  // =========================
  // Edit Job
  // =========================
  const handleEdit = (job) => {

    setEditId(job._id);

    setJob({
      company: job.company,
      title: job.title,
      location: job.location,
      salary: job.salary,
      type: job.type,
      description: job.description,
      skills: job.skills.join(", "),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  // =========================
  // Delete Job
  // =========================
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {

      const res = await deleteJob(id);

      alert(res.data.message);

      fetchJobs();
      fetchDashboardStats();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );

    }

  };
  <button
    className="view-btn"
    onClick={() =>
      handleViewApplicants(item._id, item.title)
    }
  >
    View Applicants
  </button>
  // =========================
  // Update Job
  // =========================
  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const data = {
        ...job,
        skills: job.skills
          .split(",")
          .map(skill => skill.trim()),
      };

      const res = await updateJob(editId, data);

      alert(res.data.message);

      setEditId(null);

      setJob({
        company: "",
        title: "",
        location: "",
        salary: "",
        type: "",
        description: "",
        skills: "",
      });

      fetchJobs();
      fetchDashboardStats();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Update Failed"
      );

    }

  };
  // =========================
  // View Applicants
  // =========================
  const handleViewApplicants = async (jobId, title) => {

    try {

      const res = await getApplicantsByJob(jobId);

      setApplicants(res.data.applications);

      setSelectedJob(title);

    } catch (error) {

      console.log(error);

      alert("Failed to load applicants");

    }

  };
  // =========================
  // Update Status
  // =========================
  const handleStatus = async (id, status) => {

    try {

      const res = await updateApplicationStatus(id, status);

      alert(res.data.message);

      handleViewApplicants(
        applicants[0].job._id,
        selectedJob
      );

    } catch (error) {

      console.log(error);

      alert("Status Update Failed");

    }

  };

  return (

    <div className="admin-container">
      <div className="stats-grid">

        <div className="stat-card">
          <h2>👥</h2>
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>

        <div className="stat-card">
          <h2>💼</h2>
          <h3>{stats.totalJobs}</h3>
          <p>Total Jobs</p>
        </div>

        <div className="stat-card">
          <h2>📄</h2>
          <h3>{stats.totalApplications}</h3>
          <p>Total Applications</p>
        </div>

        <div className="stat-card">
          <h2>📑</h2>
          <h3>{stats.totalResumes}</h3>
          <p>Uploaded Resumes</p>
        </div>

      </div>
      <div className="stats-grid">

        <div className="stat-card">
          <h2>👥</h2>
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>

        <div className="stat-card">
          <h2>💼</h2>
          <h3>{stats.totalJobs}</h3>
          <p>Total Jobs</p>
        </div>

        <div className="stat-card">
          <h2>📄</h2>
          <h3>{stats.totalApplications}</h3>
          <p>Applications</p>
        </div>

        <div className="stat-card">
          <h2>📑</h2>
          <h3>{stats.totalResumes}</h3>
          <p>Uploaded Resumes</p>
        </div>

      </div>
      <AdminCharts stats={stats} />

      <h1>Add New Job</h1>

      <form onSubmit={editId ? handleUpdate : handleSubmit}>

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={job.company}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={job.salary}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="type"
          placeholder="Job Type"
          value={job.type}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="React, Node.js, MongoDB"
          value={job.skills}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editId ? "Update Job" : "Add Job"}
        </button>

      </form>

      <hr />

      <h2>All Jobs</h2>

      <div className="jobs-list">

        {jobs.length === 0 ? (

          <p>No Jobs Available</p>

        ) : (

          jobs.map((item) => (

            <div
              key={item._id}
              className="job-item"
            >

              <h3>{item.title}</h3>

              <p>
                <strong>Company:</strong> {item.company}
              </p>

              <p>
                <strong>Location:</strong> {item.location}
              </p>

              <p>
                <strong>Salary:</strong> {item.salary}
              </p>

              <button
                className="edit-btn"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>

              <button
                className="view-btn"
                onClick={() => handleViewApplicants(item._id, item.title)}
              >
                View Applicants
              </button>

            </div>

          ))

        )}

      </div>

      <hr />

      <h2>
        Applicants {selectedJob && `- ${selectedJob}`}
      </h2>

      {
        applicants.length === 0 ? (

          <p>No Applicants Yet</p>

        ) : (

          applicants.map((app) => (

            <div
              key={app._id}
              className="applicant-card"
            >

              <h3>{app.student.fullName}</h3>

              <p>
                <strong>Email:</strong> {app.student.email}
              </p>

              <p>
                <strong>College:</strong> {app.student.college || "Not Added"}
              </p>

              <p>
                <strong>Skills:</strong>{" "}
                {app.student.skills?.join(", ") || "No Skills"}
              </p>
              <p>
                <strong>Status:</strong> {app.status}
              </p>

              <button
                className="accept-btn"
                onClick={() =>
                  handleStatus(app._id, "Accepted")
                }
              >
                Accept
              </button>

              <button
                className="reject-btn"
                onClick={() =>
                  handleStatus(app._id, "Rejected")
                }
              >
                Reject
              </button>

              {
                app.student.resume ? (

                  <a
                    href={app.student.resume}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📄 View Resume
                  </a>

                ) : (

                  <p>No Resume Uploaded</p>

                )
              }

            </div>

          ))

        )
      }

    </div>

  );

}

export default AdminDashboard;