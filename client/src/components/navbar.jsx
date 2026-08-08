import { NavLink, useNavigate } from "react-router-dom";
import { getToken, logout } from "../utils/auth";
import "../styles/navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const token = getToken();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    alert("Logged Out Successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h2 className="logo">SkillSync</h2>

      <ul className="nav-links">

        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/jobs">Jobs</NavLink>
        </li>

        {token ? (
          <>

            <li>
              <NavLink
                to={user?.role === "admin" ? "/admin" : "/dashboard"}
              >
                {user?.role === "admin"
                  ? "Admin Panel"
                  : "Dashboard"}
              </NavLink>
            </li>

            {user?.role !== "admin" && (
              <li>
                <NavLink to="/profile">
                  Profile
                </NavLink>
              </li>
            )}

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>

          </>
        ) : (
          <>

            <li>
              <NavLink to="/login">
                Login
              </NavLink>
            </li>

            <li>
              <NavLink to="/register">
                Register
              </NavLink>
            </li>

          </>
        )}

      </ul>

    </nav>
  );
}

export default Navbar;