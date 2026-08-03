import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }
  console.log(formData);
  const handleSubmit = (e) => {
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
      alert("you must enter the password")
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
  alert("form submitted");
  setFormData({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
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
          type="password"
          placeholder="Enter Password" name="password" value={formData.password} onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
        />

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