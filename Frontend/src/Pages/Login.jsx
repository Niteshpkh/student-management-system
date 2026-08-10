import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const[loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    });

   async function submitForm(e) {
        e.preventDefault();
        if (formData.userName === "") {
            alert("enter username");
            return;
        }
        if (formData.password === "") {
            alert("please enter the password");
            return;
        }
        const user = {
            userName: formData.userName,
            password: formData.password
        };
        setLoading(true);
        await new Promise(resolve => setTimeout (resolve, 2000));
        try {
            console.log("Sending to backend:", user);
            await axios.post("http://localhost:8080/user/login", user);
            localStorage.setItem("userName", formData.userName);
            setFormData({
                userName: "",
                password: ""
            });
            localStorage.setItem("IsLoggedIn","true");
            setError("")
            navigate("/dashboard");
        }
        catch (error) {
            setLoading(false);
           setError("Invalid username and password");
           setFormData({
            userName : "",
            password : ""
           });
        }
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
                    <button className="login-button" type="submit" >{loading ? "Logging In ..." : "Login"}</button>
                </div>
                {error && <p className='error'>{error}</p>}
                

                <div className="signup-text">
                    <p>
                        Don't have an account? <Link className="signup-link" to="/signin">Sign Up</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;