import { useEffect, useState } from "react";
import { getMyApplications, withdrawApplication } from "../services/applicationService";
import "../styles/Applications.css";

function Applications() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // Active Applications
  // =========================

  const activeApplications = applications.filter(
    (application) => application.status !== "Withdrawn"
  );

  // =========================
  // Withdraw Application
  // =========================

  const handleWithdraw = async (applicationId) => {

    const confirmed = window.confirm(
      "Are you sure you want to withdraw this application?"
    );

    if (!confirmed) return;

    try {

      await withdrawApplication(applicationId);

      setApplications((prev) =>
        prev.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status: "Withdrawn",
              }
            : application
        )
      );

    } catch (error) {

      console.log("Withdraw Error:", error);

      alert(
        error.message ||
        "Failed to withdraw application"
      );

    }
  };

  // =========================
  // Fetch Applications
  // =========================

  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const response = await getMyApplications();

        setApplications(
          response.data.applications || []
        );

      } catch (error) {

        console.log(
          "Applications Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchApplications();

  }, []);

  // =========================
  // Loading
  // =========================

  if (loading) {

    return (
      <div className="page-loading">
        Loading Applications...
      </div>
    );

  }

  // =========================
  // Page
  // =========================

  return (

    <div className="applications-page">

      <div className="applications-header">

        <h1>
          My Applications
        </h1>

        <p>
          Track all the jobs you have applied for.
        </p>

      </div>

      {/* =========================
          No Active Applications
      ========================= */}

      {activeApplications.length === 0 ? (

        <div className="empty-applications">

          <div className="empty-icon">
            📄
          </div>

          <h2>
            No Active Applications
          </h2>

          <p>
            You don't have any active job applications.
          </p>

          <a
            href="/jobs"
            className="browse-btn"
          >
            Browse Jobs
          </a>

        </div>

      ) : (

        <div className="applications-list">

          {applications.map((application) => (

            <div
              className="application-card"
              key={application._id}
            >

              {/* Company Logo */}

              <div className="application-logo">

                {application.job?.company
                  ?.charAt(0)
                  .toUpperCase() || "S"}

              </div>

              {/* Application Information */}

              <div className="application-info">

                <h2>
                  {application.job?.title || "Job"}
                </h2>

                <h3>
                  {application.job?.company || "Company"}
                </h3>

                <p>
                  📍 {application.job?.location || "Remote"}
                </p>

                <span>
                  Applied on{" "}
                  {new Date(
                    application.createdAt
                  ).toLocaleDateString()}
                </span>

              </div>

              {/* Status / Withdraw */}

              <div
                className={`application-status ${
                  application.status?.toLowerCase() || "applied"
                }`}
              >

                {/* Status */}

                <span>
                  {application.status || "Applied"}
                </span>

                {/* Withdraw Button */}

                {application.status === "Applied" && (

                  <button
                    className="withdraw-btn"
                    onClick={() =>
                      handleWithdraw(
                        application._id
                      )
                    }
                  >
                    Withdraw Application
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default Applications;