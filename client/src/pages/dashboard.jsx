import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/userService";
import { getMyApplications } from "../services/applicationService";
import { getSavedJobs } from "../services/savedJobService";
import { getJobs } from "../services/jobService";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";


function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") !== "false"
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await getProfile();
        setUser(profileRes.data.user);

        const applicationRes = await getMyApplications();

        console.log(
          "APPLICATIONS FROM BACKEND:",
          applicationRes.data.applications
        );

        setApplications(applicationRes.data.applications || []);

        const savedJobsRes = await getSavedJobs();
        setSavedJobs(savedJobsRes.data.savedJobs || []);

        const jobsRes = await getJobs();
        setTotalJobs(jobsRes.data.jobs?.length || 0);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="loading-orb"></div>
        <h2>Loading SkillSync...</h2>
      </div>
    );
  }

  // =========================
  // Profile Completion
  // =========================

  let completion = 20;

  if (user.fullName) completion += 15;
  if (user.email) completion += 15;
  if (user.college) completion += 15;
  if (user.skills?.length > 0) completion += 20;
  if (user.resume) completion += 15;

  completion = Math.min(completion, 100);

  // =========================
  // Active Applications
  // =========================

  const activeApplications = applications.filter(
    (application) => application.status !== "Withdrawn"
  );

  // =========================
  // Recent Applications
  // =========================

  const recentApplications = activeApplications.slice(0, 4);

  return (
    <div className={`dashboard ${darkMode ? "dark-mode" : "light-mode"}`}>

      {/* Background Glow */}

      <div className="bg-glow glow-one"></div>
      <div className="bg-glow glow-two"></div>
      <div className="bg-glow glow-three"></div>

      {/* =========================
          Sidebar
      ========================= */}

      <aside className="sidebar">

        <nav className="side-menu">

          {/* Dashboard */}
          <div
            className="side-item active"
            onClick={() => navigate("/dashboard")}
          >
            <span>▦</span>
            <span>Dashboard</span>
          </div>


          {/* Browse Jobs */}
          <div
            className="side-item"
            onClick={() => navigate("/jobs")}
          >
            <span>▣</span>
            <span>Browse Jobs</span>
          </div>


          {/* My Applications */}
          <Link to="/applications" className="side-item">
            <span>▤</span>
            <span>My Applications</span>

            {activeApplications.length > 0 && (
              <span className="notification-badge">
                {activeApplications.length}
              </span>
            )}
          </Link>

          <Link to="/saved-jobs" className="side-item">
            <span>♡</span>
            <span>Saved Jobs</span>

            {savedJobs.length > 0 && (
              <span className="notification-badge">
                {savedJobs.length}
              </span>
            )}
          </Link>
          {/* My Profile */}
          <div
            className="side-item"
            onClick={() => navigate("/profile")}
          >
            <span>♙</span>
            <span>My Profile</span>
          </div>


          {/* Messages */}
          <div
            className="side-item"
            onClick={() => navigate("/messages")}
          >
            <span>✉</span>
            <span>Messages</span>
          </div>


          {/* Notifications */}
          <div
            className="side-item"
            onClick={() => navigate("/notifications")}
          >
            <span>♧</span>
            <span>Notifications</span>

            <span className="notification-badge">
              3
            </span>
          </div>


          {/* Settings */}
          <div
            className="side-item"
            onClick={() => navigate("/settings")}
          >
            <span>⚙</span>
            <span>Settings</span>
          </div>

        </nav>

        <div
          className="dark-mode-card"
          onClick={() => setDarkMode(!darkMode)}
        >

          <div>
            <span className="moon-icon">
              {darkMode ? "◐" : "☀"}
            </span>

            <span>
              {darkMode ? "Dark Mode" : "Light Mode"}
            </span>
          </div>

          <div className={`toggle ${darkMode ? "toggle-on" : "toggle-off"}`}>
            <div className="toggle-circle"></div>
          </div>

        </div>

        {/* User */}

        <div className="sidebar-user">

          <div className="user-avatar">

            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.fullName}
              />
            ) : (
              user.fullName?.charAt(0).toUpperCase()
            )}

          </div>

          <div className="user-info">

            <strong>{user.fullName}</strong>

            <span>
              {user.role === "student"
                ? "Student"
                : user.role}
            </span>

          </div>

          <span className="user-arrow">⌄</span>

        </div>

      </aside>


      {/* =========================
          Main Dashboard
      ========================= */}

      <main className="dashboard-main">

        {/* Top Bar */}

        <div className="dashboard-topbar">

          <div className="search-box">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search for jobs, companies..."
            />

            <span className="search-icon">⌕</span>

          </div>

          <div className="top-actions">

            <div className="notification-icon">
              ♧
              <span>3</span>
            </div>

            <div className="top-avatar">

              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.fullName}
                />
              ) : (
                user.fullName?.charAt(0).toUpperCase()
              )}

            </div>

          </div>

        </div>


        {/* Welcome */}

        <section className="welcome-section">

          <h1>
            Hello, {user.fullName?.split(" ")[0]} 👋
          </h1>

          <p>
            Find your dream job today!
          </p>

        </section>


        {/* =========================
            Statistics
        ========================= */}

        <section className="stats-grid">

          <div className="glass-stat purple-stat">

            <div className="stat-icon purple-icon">
              💼
            </div>

            <div className="stat-content">

              <span>Total Jobs</span>

              <strong>{totalJobs}</strong>

              <small>
                Explore opportunities
              </small>

            </div>

            <div className="mini-wave purple-wave">
              ╱╲╱╲╱╲
            </div>

          </div>


          <div className="glass-stat blue-stat">

            <div className="stat-icon blue-icon">
              📄
            </div>

            <div className="stat-content">

              <span>Applications</span>

              <strong>{activeApplications.length}</strong>
              <small>
                Jobs applied
              </small>

            </div>

            <div className="mini-wave blue-wave">
              ╱╲╱╲╱╲
            </div>

          </div>


          <div className="glass-stat pink-stat">



            <div className="card saved-jobs-card">
              <div className="card-icon saved-icon">
                ⭐
              </div>

              <div className="card-content">
                <h2>Saved Jobs</h2>
                <h1>{savedJobs.length}</h1>
                <p>Jobs Saved</p>
              </div>
            </div>

            <div className="mini-wave pink-wave">
              ╱╲╱╲╱╲
            </div>

          </div>


          <div className="glass-stat green-stat">

            <div className="stat-icon green-icon">
              ↗
            </div>

            <div className="stat-content">

              <span>Profile Score</span>

              <strong>{completion}%</strong>

              <small>
                {completion >= 70
                  ? "Great Profile!"
                  : "Complete your profile"}
              </small>

            </div>

            <div className="mini-wave green-wave">
              ╱╲╱╲╱╲
            </div>

          </div>

        </section>


        {/* =========================
            Main Content
        ========================= */}

        <section className="dashboard-content">


          {/* Recommended Jobs */}

          <div className="glass-panel jobs-panel">

            <div className="panel-heading">

              <h2>
                Recommended Jobs for You
              </h2>

              <a href="/jobs">
                View All →
              </a>

            </div>


            {recentApplications.length === 0 ? (

              <div className="empty-jobs">

                <div className="empty-icon">
                  💼
                </div>

                <h3>
                  Discover Your Next Opportunity
                </h3>

                <p>
                  Browse available jobs and start applying.
                </p>

                <a href="/jobs" className="browse-btn">
                  Browse Jobs
                </a>

              </div>

            ) : (

              <div className="job-list">

                {recentApplications.map((application) => (

                  <div
                    className="job-glass-card"
                    key={application._id}
                  >

                    <div className="company-logo">
                      {application.job?.company
                        ?.charAt(0)
                        .toUpperCase() || "S"}
                    </div>

                    <div className="job-info">

                      <h3>
                        {application.job?.title}
                      </h3>

                      <p>
                        {application.job?.company}
                      </p>

                      <div className="job-meta">

                        <span>
                          📍 {application.job?.location || "Remote"}
                        </span>

                        <span>
                          💼 {application.job?.type || "Full Time"}
                        </span>

                      </div>

                    </div>

                    <div className="application-status">
                      {application.status || "Applied"}
                    </div>

                  </div>

                ))}

              </div>

            )}

            <a
              href="/jobs"
              className="view-more-btn"
            >
              View More Jobs
              <span>→</span>
            </a>

          </div>


          {/* Right Column */}

          <div className="right-column">


            {/* Profile / AI Overview */}

            <div className="glass-panel match-panel">

              <div className="panel-heading">

                <h2>
                  AI Match Overview
                </h2>

                <span className="dots">
                  •••
                </span>

              </div>

              <div className="match-content">

                <div
                  className="profile-ring"
                  style={{
                    "--progress": `${completion}%`
                  }}
                >
                  <div className="ring-inner">
                    <strong>{completion}%</strong>
                    <span>Profile</span>
                  </div>
                </div>

                <div className="match-legend">

                  <div>
                    <i className="legend-green"></i>
                    <span>Profile Complete</span>
                    <strong>{completion}%</strong>
                  </div>

                  <div>
                    <i className="legend-pink"></i>
                    <span>Applications</span>
                    <strong>{activeApplications.length}</strong>
                  </div>

                  <div>
                    <i className="legend-blue"></i>
                    <span>Total Jobs</span>
                    <strong>{totalJobs}</strong>
                  </div>

                </div>

              </div>

            </div>


            {/* Recent Applications */}

            <div className="glass-panel applications-panel">

              <div className="panel-heading">

                <h2>
                  Recent Applications
                </h2>

                <a href="/applications">
                  View All
                </a>

              </div>


              {recentApplications.length === 0 ? (

                <p className="no-applications">
                  No applications yet.
                </p>

              ) : (

                recentApplications.slice(0, 3).map((application) => (

                  <div
                    className="recent-application"
                    key={application._id}
                  >

                    <div className="recent-logo">
                      {application.job?.company
                        ?.charAt(0)
                        .toUpperCase() || "S"}
                    </div>

                    <div>

                      <strong>
                        {application.job?.company}
                      </strong>

                      <span>
                        {application.job?.title}
                      </span>

                    </div>

                    <em>
                      {application.status || "Applied"}
                    </em>

                  </div>

                ))

              )}

            </div>


            {/* Improve Profile */}

            <div className="improve-card">

              <div>

                <h2>
                  Improve Your Profile 🚀
                </h2>

                <p>
                  Add more skills and complete your profile
                  to get better job recommendations.
                </p>

                <a href="/profile">
                  Update Profile
                </a>

              </div>

              <div className="target-icon">
                🎯
              </div>

            </div>

          </div>

        </section>

      </main>

    </div >
  );
}

export default Dashboard;