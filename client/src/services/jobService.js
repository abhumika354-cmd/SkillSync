import API from "../api/axios";

// =========================
// Get All Jobs / Search Jobs
// =========================
export const getJobs = (keyword = "") => {
  return API.get(`/jobs?keyword=${keyword}`);
};

// =========================
// Get Single Job
// =========================
export const getSingleJob = (id) => {
  return API.get(`/jobs/${id}`);
};

// =========================
// AI Match Score
// =========================
export const getMatchScore = (id) => {

  const token = localStorage.getItem("token");

  return API.get(
    `/jobs/match/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};