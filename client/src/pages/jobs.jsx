import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../services/jobService";
import { getMyApplications } from "../services/applicationService";
import { saveJob } from "../services/savedJobService";
import "../styles/jobs.css";

function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {

    const fetchData = async () => {
      try {

        const jobsRes = await getJobs(keyword);
        setJobs(jobsRes.data.jobs);

        const applicationsRes = await getMyApplications();

        // Only active applications should show as Applied
        const appliedIds = applicationsRes.data.applications
          .filter(
            (application) => application.status !== "Withdrawn"
          )
          .map(
            (application) => application.job._id
          );

        setAppliedJobs(appliedIds);

      } catch (error) {

        console.log(error);

      }
    };

    fetchData();

  }, [keyword]);

  // =========================
  // Save Job
  // =========================
  const handleSaveJob = async (jobId) => {

    try {

      const res = await saveJob(jobId);

      alert(res.data.message);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to Save Job"
      );

    }

  };

  return (

    <div className="jobs-page">

      <h1>Available Jobs</h1>

      <div className="filter-container">

        <input
          type="text"
          placeholder="🔍 Search Job..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>

      </div>

      <div className="search-box">

        <input
          type="text"
          placeholder="🔍 Search by title, company or location..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

      </div>

      <div className="jobs-container">

        {jobs
          .filter((job) => {

            const matchesSearch =
              job.title.toLowerCase().includes(search.toLowerCase()) ||
              job.company.toLowerCase().includes(search.toLowerCase()) ||
              job.location.toLowerCase().includes(search.toLowerCase());

            const matchesLocation =
              locationFilter === "" ||
              job.location === locationFilter;

            const matchesType =
              typeFilter === "" ||
              job.type === typeFilter;

            return (
              matchesSearch &&
              matchesLocation &&
              matchesType
            );

          })
          .map((job) => (

            <div className="job-card" key={job._id}>

              <h2>{job.title}</h2>

              <p>
                <strong>Company:</strong> {job.company}
              </p>

              <p>
                <strong>Location:</strong> {job.location}
              </p>

              <p>
                <strong>Salary:</strong> {job.salary}
              </p>

              <p>
                <strong>Type:</strong> {job.type}
              </p>

              <div className="job-actions">

                {appliedJobs.includes(job._id) ? (

                  <button
                    disabled
                    style={{
                      background: "green",
                      cursor: "not-allowed",
                    }}
                  >
                    Already Applied ✅
                  </button>

                ) : (

                  <Link to={`/job-details/${job._id}`}>
                    <button>
                      Apply Now
                    </button>
                  </Link>

                )}

                <button
                  className="save-btn"
                  onClick={() => handleSaveJob(job._id)}
                >
                  ❤️ Save
                </button>

              </div>

            </div>

          ))}

      </div>

    </div>

  );

}

export default Jobs;