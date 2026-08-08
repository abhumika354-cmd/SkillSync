import axios from "axios";

const API = "http://localhost:5000/api/applications";

// =========================
// Get Applicants By Job
// =========================
export const getApplicantsByJob = async (jobId) => {

  const token = localStorage.getItem("token");

  return await axios.get(
    `${API}/job/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};

// =========================
// Update Application Status
// =========================
export const updateApplicationStatus = async (id, status) => {

  const token = localStorage.getItem("token");

  return await axios.put(
    `${API}/${id}`,          
    { status }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};