import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./SignIn.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role : ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.userName.trim() === "") {
      alert("userName is required");
      return;
    }
    if (formData.email.trim() === "") {
      alert("email is required");
      return;
    }

    if (formData.password === "") {
      alert("you must enter the password");
      return;
    }

  if (formData.confirmPassword === "") {
    alert("enter the confirm password");
    return;
  }
   if (formData.password !== formData.confirmPassword) {
      alert("password must match");
      return;
    }
    
  if (formData.password.length < 6) {
    alert("password must be gat least 6 characters");
    return;
  }
  const user = {
    userName : formData.userName,
    password : formData.password,
    role: formData.role
  };
  try{
   const response =  await axios.post("http://localhost:8080/user", user);
   console.log(response);
    alert("Account created successfully");
     setFormData({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });
  navigate("/");
  }
  catch(error){
    console.log(error);
    alert ("something went wrong");
  }
}


return (

  <div className="signup-container">
    <div className="signup-card">
      <h1>Student Management System</h1>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Username" name="userName" value={formData.userName} onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Enter Email" name="email" value={formData.email} onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Enter Password" name="password" value={formData.password} onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
        />

              <div>
                    <label>Role:</label><br />
                   <select value={formData.role} name= "role" onChange={handleChange}>
                    <option value="">Select Role: </option>
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="ADMIN">Admin</option>
                   </select>
                </div>

        <button type="submit">
          Register
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/">Login</Link>
      </p>
    </div>
  </div>
);
};

export default SignIn;