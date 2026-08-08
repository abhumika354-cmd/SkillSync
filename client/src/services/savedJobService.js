import API from "../api/axios";


// Save Job
export const saveJob = (jobId) => {

  const token = localStorage.getItem("token");

  return API.post(
    "/saved-jobs/save",
    { jobId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};


// Get Saved Jobs
export const getSavedJobs = () => {

  const token = localStorage.getItem("token");

  return API.get(
    "/saved-jobs",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};


// Remove Saved Job
export const removeSavedJob = (id) => {

  const token = localStorage.getItem("token");

  return API.delete(
    `/saved-jobs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};