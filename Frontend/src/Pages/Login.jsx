import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    });

    function submitForm(e) {
        e.preventDefault();
            if(formData.userName === "")
        {
            alert("enter username");
        }
        if(formData.password === "")
        {
            alert("please enter the password");
        }
       
        setFormData({
            userName : "",
            password : ""
        });
        navigate('/dashboard');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData);
    }

    return (
    <div className="login-container">
    <form className="login-form" onSubmit={submitForm}>
        <div className="form-group">
            <label className="login-label">Username</label><br />
            <input
                className="login-input"
                type="text"
                placeholder="Enter username"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
            />
        </div>

        <div className="form-group">
            <label className="login-label">Password</label><br />
            <input
                className="login-input"
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
        </div>

        <div className="button-group">
            <button className="login-button" type="submit">Submit</button>
        </div>

        <div className="signup-text">
            <p>
                Don't have an account? <Link className="signup-link" to="/signin">Sign In</Link>
            </p>
        </div>
    </form>
</div>
    );
};

export default Login;