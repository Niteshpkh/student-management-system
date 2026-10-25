import React, { useEffect, useState } from "react";
import "./Student.css";
import api from "../../api/axios";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [role, setRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [student, setStudent] = useState({
    age: "",
    name: "",
    grade: "",
    Parents_name: "",
    contact_no: "",
  });

  const emptyStudent = { age: "", name: "", grade: "", Parents_name: "", contact_no: "" };

  const getAllStudents = async () => {
    const res = await api.get("/student_data");
    const studentList = Array.isArray(res.data?.students)
      ? res.data.students
      : Array.isArray(res.data)
      ? res.data
      : [];
    setStudents(studentList);
  };

  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (userRole === "STUDENT") {
      api.get("/student_data/me")
        .then((res) => setStudents(Array.isArray(res.data) ? res.data : [res.data]))
        .catch((err) => console.log("Profile not found:", err));
    }
  }, [userRole]);

  useEffect(() => {
    api.get("/user/current")
      .then((res) => {
        const userRole = res.data.role;
        setRole(userRole);
        if (userRole === "STUDENT") {
          api.get("/student_data/me")
            .then((r) => setStudents(Array.isArray(r.data) ? r.data : [r.data]))
            .catch(() => {});
        } else {
          getAllStudents();
        }
      })
      .catch((err) => console.error("Failed to get role:", err));
  }, []);

  const openSidebar = () => {
    setStudent(emptyStudent);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setStudent(emptyStudent);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student.name.trim()) return alert("Enter Student Name");
    if (!student.age) return alert("Enter Student Age");
    if (!student.grade.trim()) return alert("Enter Student Grade");
    if (!student.Parents_name.trim()) return alert("Enter Parent Name");
    if (!student.contact_no) return alert("Enter Contact Number");

    try {
      if (student.id) {
        await api.put(`/student_data/${student.id}`, student);
      } else {
        await api.post("/student_data", student);
      }
      getAllStudents();
      closeSidebar();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/student_data/${id}`);
    getAllStudents();
    alert("Student deleted successfully");
  };

  const handleEdit = (s) => {
    setStudent(s);
    setSidebarOpen(true);
  };

  // Loading state
  if (role === null) {
    return <div className="student-container"><p>Loading...</p></div>;
  }

  // STUDENT: read-only view
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

      {/* Page Header with Add Button */}
      <div className="student-page-header">
        <h1>Students <span>({students.length} enrolled)</span></h1>
        <button className="add-student-btn" onClick={openSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Student
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={closeSidebar}
      />

      {/* Sidebar Form */}
      <div className={`student-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>{student.id ? "Edit Student" : "Add Student"}</h2>
          <button className="sidebar-close-btn" onClick={closeSidebar}>✕</button>
        </div>

        <form className="student-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-input" type="text" name="name"
              value={student.name} placeholder="Enter Student Name" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Age</label>
            <input className="form-input" type="number" name="age"
              value={student.age} placeholder="Enter Student Age" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Grade</label>
            <input className="form-input" type="text" name="grade"
              value={student.grade} placeholder="Enter Grade" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Parent Name</label>
            <input className="form-input" type="text" name="Parents_name"
              value={student.Parents_name} placeholder="Enter Parent Name" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Contact Number</label>
            <input className="form-input" type="tel" name="contact_no"
              value={student.contact_no} placeholder="Enter Contact Number" onChange={handleChange} />
          </div>

          <button className="submit-btn" type="submit">
            {student.id ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>

      {/* Student Table */}
      <div className="student-table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
              <th>Parent Name</th>
              <th>Contact Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="empty-state">
                    <div className="empty-state-icon">📚</div>
                    <p>No students found. Click "Add Student" to get started.</p>
                  </div>
                </td>
              </tr>
            ) : (
              students.map((s, index) => (
                <tr key={s.id || index}>
                  <td>{s.name}</td>
                  <td>{s.age}</td>
                  <td>{s.grade}</td>
                  <td>{s.Parents_name}</td>
                  <td>{s.contact_no}</td>
                  <td>
                    <div className="action-btns">
                      <button className="action-btn edit" title="Edit" onClick={() => handleEdit(s)}>✎</button>
                      <button className="action-btn delete" title="Delete" onClick={() => handleDelete(s.id)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Students;
