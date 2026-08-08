import axios from "axios";

const API = "http://localhost:5000/api/admin";

export const getDashboardStats = async () => {

  const token = localStorage.getItem("token");

  return await axios.get(
    `${API}/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};