import axios from "axios";

const API = "http://localhost:5000/api/jobs";

// =========================
// Add New Job
// =========================
export const addJob = async (jobData) => {

  const token = localStorage.getItem("token");

  console.log("========== ADD JOB ==========");
  console.log("TOKEN:", token);

  return await axios.post(
    `${API}/add`,
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};


// =========================
// Delete Job
// =========================
export const deleteJob = async (id) => {

  const token = localStorage.getItem("token");

  return await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};


// =========================
// Update Job
// =========================
export const updateJob = async (id, jobData) => {

  const token = localStorage.getItem("token");

  return await axios.put(
    `${API}/${id}`,
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};