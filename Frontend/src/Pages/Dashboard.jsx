import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../Components/StatCard";
import api from "../../api/axios";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [users, setUsers] = useState([]);

  const getData = async (url, setData) => {
    try {
      const response= await api.get(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cards = [
    {
      type : "student",
      title:"Students",
      value: students.length,
      icon: "🎓",
      subtitle: "Enrolled Nursery - Gr 8"
    },
    {
      type : "teachers", 
      title : "Teachers",
      value : teachers.length,
      icon: "👨‍🏫",
      subtitle: "Dedicated Educators"
    },
    {
      type : "user",
      title : "Users",
      value : users.length,
      icon: "👥",
      subtitle: "System User Accounts"
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
                    getData("/student_data/me", setStudents);
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
          <div className="dashboard-header-banner">
            <h1>Rational Academy Dashboard</h1>
            <p>सुन्दरहरैँचा-८, सलकपुर, मोरङ • Academic & Administrative Overview (Nursery - Grade 8)</p>
          </div>
          <div className="stats-container">
            {cards.map((card) => (
              <StatCard 
                key={card.title} 
                title={card.title}
                value={card.value} 
                icon={card.icon}
                subtitle={card.subtitle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;