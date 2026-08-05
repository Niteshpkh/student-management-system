import React, { useState } from 'react'
import './Student.css'
import axios from 'axios'

const Students = () => {
  const [student, setStudent] = useState({
    age: "",
    name: "",
    grade: "",
    Parents_name: "",
    contact_no: ""

  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (student.name.trim() === "") {
      alert("Enter student Name");
      return;
    }
    if (student.age === "") {
      alert("Enter the age of the student");
      return;
    }

    if (student.grade === "") {
      alert("Enter the grade of the student");
      return;
    }
    if (student.Parents_name === "") {
      alert("Enter the parents name");
      return;
    }
    if (student.contact_no === "") {
      alert("Enter the contact number of the parents");
      return;
    }
    try {
      await axios.post("http://localhost:8080/student_data", student);
      alert("student added successfully");
       setStudent({
        age: "",
        name: "",
        grade: "",
        Parents_name: "",
        contact_no: ""
      })
    }
    catch (e) {
      return new console.error(e);
      
     
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value
    })
  }
  return (
    <div>
      <div className="student-container">
        <form className="student-form" onSubmit={handleSubmit}>

          <h2 className="form-title">Add Student</h2>

          <label className="form-label" htmlFor="name">Name:</label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={student.name}
            placeholder="Enter Your Name"
            onChange={handleChange}
          />

          <label className="form-label" htmlFor="age">Age:</label>
          <input
            className="form-input"
            type="number"
            name="age"
            placeholder="Enter Your Age"
            onChange={handleChange}
            value={student.age}
          />

          <label className="form-label" htmlFor="grade">Grade:</label>
          <input
            className="form-input"
            type="text"
            name="grade"
            placeholder="Enter Your Grade"
            value={student.grade}
            onChange={handleChange}
          />

          <label className="form-label" htmlFor="parentsName">Parents Name:</label>
          <input
            className="form-input"
            type="text"
            placeholder="Parents Name"
            name="Parents_name"
            value={student.Parents_name}
            onChange={handleChange}
          />

          <label className="form-label" htmlFor="contactNo">Contact Number:</label>
          <input
            className="form-input"
            type="tel"
            placeholder="Contact Number"
            name="contact_no"
            value={student.contact_no}
            onChange={handleChange}
          />

          <button className="submit-btn" type="submit">
            Add Student
          </button>

        </form>
      </div>

    </div>
  )
}

export default Students