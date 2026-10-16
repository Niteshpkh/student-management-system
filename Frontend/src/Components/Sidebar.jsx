import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useEffect, useState } from "react";
import api from "../../api/axios";


const Sidebar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  useEffect(() => {
    api.get("/user/current", {
      auth: {
        username: localStorage.getItem("userName"),
        password: localStorage.getItem("password")
      }
    })
      .then(response => {
        console.log(response);
        setUser(response.data);
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }, []);
  function handleLLogout() {
    localStorage.removeItem("IsLoggedIn");
    localStorage.removeItem("userName");
    navigate("/");
  }
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <img src="/logo.svg" alt="Rational Academy" className="sidebar-logo" />
        <div className="sidebar-brand-text">
          <h3>Rational Academy</h3>
          <span>Salakpur, Morang</span>
        </div>
      </div>

      <div className="sidebar-role-badge">
        Portal: <strong>{user?.role || "USER"}</strong>
      </div>

      <ul className="sidebar-menu">
        {/* Dashboard — visible to all roles */}
        <li>
          <Link to="/dashboard">
            <span className="menu-icon">📊</span>
            <span>Dashboard</span>
          </Link>
        </li>

        {/* STUDENT: see their own details */}
        {user?.role === "STUDENT" && (
          <li>
            <Link to="/my-details">
              <span className="menu-icon">👤</span>
              <span>My Details</span>
            </Link>
          </li>
        )}

        {/* ADMIN / TEACHER: student management */}
        {(user?.role === "ADMIN" || user?.role === "TEACHER") && (
          <li>
            <Link to="/students">
              <span className="menu-icon">🎓</span>
              <span>Students</span>
            </Link>
          </li>
        )}

        {/* ADMIN only: teachers and users */}
        {user?.role === "ADMIN" && (
          <li>
            <Link to="/teachers">
              <span className="menu-icon">👨‍🏫</span>
              <span>Teachers</span>
            </Link>
          </li>
        )}
        {user?.role === "ADMIN" && (
          <li>
            <Link to="/users">
              <span className="menu-icon">👥</span>
              <span>Users</span>
            </Link>
          </li>
        )}

        <li className="sidebar-divider"></li>

        <li>
          <Link to="/" className="sidebar-home-link">
            <span className="menu-icon">🌐</span>
            <span>School Website</span>
          </Link>
        </li>

        <li>
          <Link to="/" onClick={handleLLogout} className="sidebar-logout-link">
            <span className="menu-icon">🚪</span>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;