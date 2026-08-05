import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "./Dashboard.css";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const Navigate = useNavigate()
  useEffect(()=> {
    const isLoggedIn = localStorage.getItem("IsLoggedIn");
    if(isLoggedIn!== "true"){
      Navigate("/");
    }
  })
  return (
    <div>
          <h1>Dashboard</h1>
          <p>Welcome  to Student Management System</p>
        </div>

   

  );
};

export default Dashboard;