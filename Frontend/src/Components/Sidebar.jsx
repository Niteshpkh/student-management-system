import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useEffect, useState } from "react";
import axios from "axios";


const Sidebar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  useEffect(() => {
    axios.get("http://localhost:8080/user/current",{
      auth: {
        username : localStorage.getItem("userName"),
        password : localStorage.getItem("password")
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

      <h2>SMS</h2>

      <ul>
        {(user?.role === "ADMIN" || user?.role === "TEACHER" )  && (
          <li>
            <Link to="/dashboard">  Dashboard</Link>
          </li>
        )}

        {(user?.role === "ADMIN" || user?.role === "TEACHER") && (
        <li>
          <Link to="/students">student</Link>
        </li>
        )}
        {user?.role==="ADMIN"  && (

          <li>
          <Link to="/teachers"> Teachers</Link>
        </li>
        )} 
        {user?.role==="ADMIN"  && (
        <li>
          <Link to="/users"> Users</Link>
        </li>
        )}

        <li>
          <Link to="/" onClick={handleLLogout} >Logout</Link>
        </li>

      </ul>

    </div>
  );
};

export default Sidebar;