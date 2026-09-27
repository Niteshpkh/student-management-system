import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../Components/StatCard";
import axios from "axios";
import api from "../../api/axios";

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
      type : "student",
      title:"Students",
      value: students.length
    },
    {
      type : "teachers", 
      title : "Teachers",
      value : teachers.length
    },
    {
      type : "user",
      title : "Users",
      value : users.length
    }
  ];

useEffect(() => {
    api.get("/user/current")
        .then(response => {
            const role = response.data.role;

            switch (role) {
                case "ADMIN":
                    getData("/student_data", setStudents);
                    getData("/user", setUsers);
                    getData("/teacher_data", setTeachers);
                    break;

                case "TEACHER":
                    getData("/student_data", setStudents);
                    break;

                case "STUDENT":
                    getData("/student/me", setStudents);
                    break;

                default:
                    console.log("Unknown role:", role);
            }
        })
        .catch(error => {
            console.log("Failed to get current user:", error);
        });
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
    <StatCard 
    key={card.title} 
    value={card.value} 
    />
     ))}
     </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;