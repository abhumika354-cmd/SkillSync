import API from "../api/axios";

export const uploadResume = async (formData) => {

  const token = localStorage.getItem("token");

  return API.post(
    "/resume/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

};