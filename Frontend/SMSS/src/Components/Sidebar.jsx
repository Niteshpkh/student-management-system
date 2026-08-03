import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <h2>SMS</h2>

      <ul>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/students">Students</Link>
        </li>

        <li>
          <Link to="/teachers">Teachers</Link>
        </li>

        <li>
          <Link to="/users">Users</Link>
        </li>

        <li>
          <Link to="/">Logout</Link>
        </li>

      </ul>

    </div>
  );
};

export default Sidebar;