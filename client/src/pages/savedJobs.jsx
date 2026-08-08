import { useEffect, useState } from "react";
import {
  getSavedJobs,
  removeSavedJob,
} from "../services/savedJobService";

import "../styles/SavedJobs.css";

function SavedJobs() {

  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedJobs = async () => {

    try {

      const response = await getSavedJobs();

      console.log("Saved Jobs:", response.data);

      setSavedJobs(
        response.data.savedJobs || []
      );

    } catch (error) {

      console.log(
        "Saved Jobs Error:",
        error.response?.data || error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchSavedJobs();

  }, []);


  const handleRemove = async (savedJobId) => {

    try {

      await removeSavedJob(savedJobId);

      setSavedJobs((previousJobs) =>
        previousJobs.filter(
          (item) => item._id !== savedJobId
        )
      );

    } catch (error) {

      console.log("Remove Error:", error);

    }

  };


  if (loading) {

    return (
      <div className="page-loading">
        Loading Saved Jobs...
      </div>
    );

  }


  return (

    <div className="saved-jobs-page">

      <div className="saved-header">

        <h1>Saved Jobs</h1>

        <p>
          Jobs you saved for later.
        </p>

      </div>


      {savedJobs.length === 0 ? (

        <div className="empty-saved">

          <div className="empty-icon">
            ⭐
          </div>

          <h2>No Saved Jobs</h2>

          <p>
            You haven't saved any jobs yet.
          </p>

          <a
            href="/jobs"
            className="browse-btn"
          >
            Browse Jobs
          </a>

        </div>

      ) : (

        <div className="saved-jobs-list">

          {savedJobs.map((savedJob) => {

            const job = savedJob.job;

            return (

              <div
                className="saved-job-card"
                key={savedJob._id}
              >

                <div className="saved-company-logo">

                  {job?.company
                    ?.charAt(0)
                    .toUpperCase() || "S"}

                </div>


                <div className="saved-job-info">

                  <h2>
                    {job?.title || "Job Title"}
                  </h2>

                  <h3>
                    {job?.company || "Company"}
                  </h3>

                  <div className="saved-job-meta">

                    <span>
                      📍 {job?.location || "Remote"}
                    </span>

                    <span>
                      💼 {job?.type || "Full Time"}
                    </span>

                  </div>

                  {job?.salary && (
                    <p>
                      💰 {job.salary}
                    </p>
                  )}

                </div>


                <div className="saved-job-actions">

                  <a
                    href={`/job-details/${job?._id}`}
                    className="view-job-btn"
                  >
                    View Job
                  </a>

                  <button
                    onClick={() =>
                      handleRemove(savedJob._id)
                    }
                    className="remove-job-btn"
                  >
                    Remove
                  </button>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>

  );

}

export default SavedJobs;