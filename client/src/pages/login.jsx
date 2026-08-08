import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/login.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      console.log("========== LOGIN START ==========");

      const res = await loginUser(formData);

      console.log("LOGIN RESPONSE:", res.data);

      if (!res.data.success) {
        alert(res.data.message);
        return;
      }

      // Save Token
      localStorage.setItem("token", res.data.token);

      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      console.log(
        "Token Saved:",
        localStorage.getItem("token")
      );

      console.log(
        "User Saved:",
        JSON.parse(localStorage.getItem("user"))
      );

      alert(res.data.message);

      // =========================
      // Redirect Based On Role
      // =========================

      if (res.data.user.role === "admin") {

        navigate("/admin");

      } else {

        navigate("/dashboard");

      }

    } catch (error) {

      console.log("========== LOGIN ERROR ==========");

      if (error.response) {

        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);

        alert(
          error.response.data.message ||
          "Login Failed"
        );

      } else {

        console.log(error);

        alert("Server Error");

      }

    }

  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password */}

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Login Button */}

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register Here
          </Link>
        </p>

      </div>

    </div>

  );
}

export default Login;