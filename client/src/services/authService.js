import API from "../api/axios";

// Register User
export const registerUser = (userData) => {
  return API.post("/auth/register", userData);
};

// Login User
export const loginUser = (userData) => {
  return API.post("/auth/login", userData);
};