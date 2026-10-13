import React, { useEffect, useState } from "react";
import "./Student.css";
import DataTable from "../Components/DataTable";
import api from "../../api/axios";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [role, setRole] = useState(null);
  const [student, setStudent] = useState({
    age: "",
    name: "",
    grade: "",
    Parents_name: "",
    contact_no: "",
  });

  const getAllStudents = async () => {
   const res = await api.get("/student_data");

const studentList = Array.isArray(res.data?.students)
  ? res.data.students
  : Array.isArray(res.data)
  ? res.data
  : [];

setStudents(studentList);
  };

const userRole = localStorage.getItem("role"); // e.g. "ADMIN", "TEACHER", "STUDENT"

useEffect(() => {
  if (userRole === "STUDENT") {
    api.get("/student_data/me")
      .then((res) => setMyDetails(res.data))
      .catch((err) => console.log("Profile not found:", err));
  }
}, [userRole]);

  useEffect(() => {
    api.get("/user/current")
      .then((res) => {
        const userRole = res.data.role;
        setRole(userRole);
        if (userRole === "STUDENT") {
          getMyData();
        } else {
          getAllStudents();
        }
      })
      .catch((err) => console.error("Failed to get role:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent({
      ...student,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (student.name.trim() === "") {
      alert("Enter Student Name");
      return;
    }

    if (student.age === "") {
      alert("Enter Student Age");
      return;
    }

    if (student.grade.trim() === "") {
      alert("Enter Student Grade");
      return;
    }

    if (student.Parents_name.trim() === "") {
      alert("Enter Parent Name");
      return;
    }

    if (student.contact_no === "") {
      alert("Enter Contact Number");
      return;
    }
try{
  if(student.id){
    await api.put(`/student_data/${student.id}`, student);
  }
  else {
    await api.post("/student_data", student);
  }
  getAllStudents();
  setStudent({
        age: "",
        name: "",
        grade: "",
        Parents_name: "",
        contact_no: "",
      });
}
catch(error){
  console.log(error);
}
}
  const handleDelete = async (id) => {

    console.log(id);

   await api.delete(`/student_data/${id}`);

    getAllStudents();

    alert("Student deleted successfully");
}

const handleEdit = (student) => {
 setStudent(student);
}

  // Show a loading state while role is being fetched
  if (role === null) {
    return <div className="student-container"><p>Loading...</p></div>;
  }

  // STUDENT: read-only view of their own data
  if (role === "STUDENT") {
    return (
      <div className="student-container">
        <div className="student-table-container">
          <h2 className="table-title">My Details</h2>
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Grade</th>
                <th>Parent Name</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, index) => (
                <tr key={index}>
                  <td>{s.name}</td>
                  <td>{s.age}</td>
                  <td>{s.grade}</td>
                  <td>{s.Parents_name}</td>
                  <td>{s.contact_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ADMIN / TEACHER: full management view
  return (
    <div className="student-container">

      <form className="student-form" onSubmit={handleSubmit}>
        <h2 className="form-title">{student.id ? "Edit Student" : "Add Student"}</h2>

        <label className="form-label">Name</label>
        <input
          className="form-input"
          type="text"
          name="name"
          value={student.name}
          placeholder="Enter Student Name"
          onChange={handleChange}
        />

        <label className="form-label">Age</label>
        <input
          className="form-input"
          type="number"
          name="age"
          value={student.age}
          placeholder="Enter Student Age"
          onChange={handleChange}
        />

        <label className="form-label">Grade</label>
        <input
          className="form-input"
          type="text"
          name="grade"
          value={student.grade}
          placeholder="Enter Grade"
          onChange={handleChange}
        />

        <label className="form-label">Parent Name</label>
        <input
          className="form-input"
          type="text"
          name="Parents_name"
          value={student.Parents_name}
          placeholder="Enter Parent Name"
          onChange={handleChange}
        />

        <label className="form-label">Contact Number</label>
        <input
          className="form-input"
          type="tel"
          name="contact_no"
          value={student.contact_no}
          placeholder="Enter Contact Number"
          onChange={handleChange}
        />

        <button className="submit-btn" type="submit">
          {student.id ? "Update Student" : "Add Student"}
        </button>
      </form>

      <div className="student-table-container">
        <h2 className="table-title">
          Student List ({students.length})
        </h2>

        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
              <th>Parent Name</th>
              <th>Contact Number</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, index) => (
              <tr key={index}>
                <td>{s.name}</td>
                <td>{s.age}</td>
                <td>{s.grade}</td>
                <td>{s.Parents_name}</td>
                <td>{s.contact_no}</td>
                <td>
                  <button onClick={() => handleDelete(s.id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => handleEdit(s)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Students;
