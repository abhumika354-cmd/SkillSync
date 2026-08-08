import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSingleJob,
  getMatchScore,
} from "../services/jobService";

import { applyJob } from "../services/applicationService";
import "../styles/JobDetails.css";
function JobDetails() {

  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState(null);

  useEffect(() => {

    const fetchJob = async () => {
      try {

        const res = await getSingleJob(id);
        setJob(res.data.job);

        try {

          const matchRes = await getMatchScore(id);

          setMatch(matchRes.data);

        } catch (error) {

          console.log(error);

        }

      } catch (error) {

        console.log(error);

      }
    };

    fetchJob();

  }, [id]);

  const handleApply = async () => {

    try {

      setLoading(true);

      const res = await applyJob(job._id);

      alert(res.data.message);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to Apply"
      );

    } finally {

      setLoading(false);

    }

  };

  if (!job) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="job-details">

      <div className="details-card">

        <h1>{job.title}</h1>

        <h3>{job.company}</h3>

        <p><strong>📍 Location:</strong> {job.location}</p>

        <p><strong>💰 Salary:</strong> {job.salary}</p>

        <p><strong>💼 Job Type:</strong> {job.type}</p>

        <p>
          <strong>Description:</strong>
        </p>

        <p>{job.description}</p>

        <p>
          <strong>Skills:</strong>{" "}
          {job.skills.join(", ")}
        </p>
        {
          match && (

            <div className="match-card">

              <h2>🤖 AI Match Score</h2>

              <div className="progress">

                <div
                  className="progress-fill"
                  style={{
                    width: `${match.score}%`,
                    background:
                      match.score >= 80
                        ? "#16a34a"
                        : match.score >= 50
                          ? "#f59e0b"
                          : "#dc2626",
                  }}
                ></div>

              </div>

              <h3>{match.score}% Match</h3>

              <p>

                <strong>✅ Matched Skills:</strong>

                {
                  match.matchedSkills.length > 0
                    ? match.matchedSkills.join(", ")
                    : "None"
                }

              </p>

              <p>

                <strong>❌ Missing Skills:</strong>

                {
                  match.missingSkills.length > 0
                    ? match.missingSkills.join(", ")
                    : "None"
                }

              </p>

            </div>

          )
        }

        <button
          className="apply-btn"
          onClick={handleApply}
          disabled={loading}
        >
          {loading ? "Applying..." : "Apply Now"}
        </button>

      </div>

    </div>
  );
}

export default JobDetails;