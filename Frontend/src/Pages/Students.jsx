import React, { useState } from 'react'
import './Student.css'

const Students = () => {
const [student, setStudent] = useState ({
  age : "",
  name : "",
  grade : "",
  Parents_name : "",
  contact_no : ""

})
const handleSubmit = async(e) => {
  

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
    />

    <label className="form-label" htmlFor="age">Age:</label>
    <input
      className="form-input"
      type="number"
      name="age"
      placeholder="Enter Your Age"
    />

    <label className="form-label" htmlFor="grade">Grade:</label>
    <input
      className="form-input"
      type="text"
      name="grade"
      placeholder="Enter Your Grade"
    />

    <label className="form-label" htmlFor="parentsName">Parents Name:</label>
    <input
      className="form-input"
      type="text"
      placeholder="Parents Name"
      name="parentsName"
    />

    <label className="form-label" htmlFor="contactNo">Contact Number:</label>
    <input
      className="form-input"
      type="tel"
      placeholder="Contact Number"
      name="contactNo"
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