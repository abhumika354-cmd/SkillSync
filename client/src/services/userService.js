import API from "../api/axios";

// =========================
// Get Profile
// =========================
export const getProfile = () => {

  const token = localStorage.getItem("token");

  return API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};

// =========================
// Update Profile
// =========================
export const updateProfile = (userData) => {

  const token = localStorage.getItem("token");

  return API.put(
    "/auth/update-profile",
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};