import React, { useEffect, useState } from "react";
import "./Student.css";
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]);

  const [student, setStudent] = useState({
    age: "",
    name: "",
    grade: "",
    Parents_name: "",
    contact_no: "",
  });

  const getAllStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/student_data");
      setStudents(response.data);
      console.log(response.data[0]);
console.log(typeof response.data[0].id);
console.log(response.data[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllStudents();
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

    if (student.contact_no.trim() === "") {
      alert("Enter Contact Number");
      return;
    }

    try {
      await axios.post("http://localhost:8080/student_data", student);

      alert("Student Added Successfully");

      setStudent({
        age: "",
        name: "",
        grade: "",
        Parents_name: "",
        contact_no: "",
      });

      getAllStudents();
    } catch (error) {
      console.error(error);
    }
  };

   const handleDelete = async(id)=>{
    console.log(id);
    await axios.delete(`http://localhost:8080/student_data/${id}`);
    getAllStudents();
    alert("student Deleted successfully");

  }

  return (
    <div className="student-container">

      <form className="student-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add Student</h2>

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
          Add Student
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
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.grade}</td>
                <td>{student.Parents_name}</td>
                <td>{student.contact_no}</td>
                <td>
                  <button onClick={()=> handleDelete(student.id)}
                  >Delete</button>
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