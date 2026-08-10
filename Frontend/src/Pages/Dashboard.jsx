import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../Components/StatCard";
import axios from "axios";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [users, setUsers] = useState([]);

  const getData = async (url, setData) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cards = [
    {
      title:"Students",
      value: students.length
    },
    {
      title : "Teachers",
      value : teachers.length
    },
    {
      title : "Users",
      value : users.length
    }
  ];

 

  useEffect(() => {
    getData("http://localhost:8080/student_data", setStudents);
    getData("http://localhost:8080/user", setUsers);
    getData("http://localhost:8080/teacher", setTeachers);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("IsLoggedIn");

    if (isLoggedIn !== "true") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      <div className="main-content">
        <div className="dashboard-body">
          <h1>Dashboard</h1>
          <p>Welcome to Student Management System</p>

          <div className="stats-container">
             {cards.map((card)=>(
    <StatCard key={card.title} value={card.value} />
  ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;