import API from "../api/axios";

// =========================
// Apply Job
// =========================
export const applyJob = (jobId) => {
  const token = localStorage.getItem("token");

  return API.post(
    "/applications/apply",
    { jobId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


// =========================
// Get My Applications
// =========================
export const getMyApplications = () => {
  const token = localStorage.getItem("token");

  return API.get(
    "/applications/my-applications",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


// =========================
// Withdraw Application
// =========================
export const withdrawApplication = (applicationId) => {
  const token = localStorage.getItem("token");

  return API.patch(
    `/applications/${applicationId}/withdraw`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};