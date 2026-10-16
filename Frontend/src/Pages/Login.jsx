import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import api from "../../api/axios"

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    async function submitForm(e) {
        e.preventDefault();
        setError("");

        if (!formData.userName.trim()) {
            setError("Please enter your username");
            return;
        }
        if (!formData.password) {
            setError("Please enter your password");
            return;
        }

        const user = {
            userName: formData.userName.trim(),
            password: formData.password
        };

        setLoading(true);

        try {
            // api instance already has withCredentials: true configured globally
            await api.post("/public/login", user);

            // Persist safe session state (never store plaintext passwords)
            localStorage.setItem("userName", user.userName);
            localStorage.setItem("IsLoggedIn", "true");

            setFormData({
                userName: "",
                password: ""
            });

            navigate("/dashboard");
        } catch (err) {
            console.error("Login failed:", err);
            setError(err.response?.data?.message || "Invalid username or password");
            setFormData((prev) => ({
                ...prev,
                password: ""
            }));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={submitForm}>
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                    <Link to="/" style={{ color: "#c51a1a", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
                        ← Back to School Website
                    </Link>
                    <div style={{ marginTop: "12px", display: "flex", justifyContent: "center" }}>
                        <img 
                            src="/logo.svg" 
                            alt="Rational Academy Logo" 
                            style={{ width: "80px", height: "80px", objectFit: "contain" }} 
                        />
                    </div>
                    <h2 style={{ color: "#991b1b", fontSize: "22px", marginTop: "8px", fontWeight: "700" }}>
                        Rational Academy
                    </h2>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: "2px 0 0" }}>
                        सुन्दरहरैँचा-८, सलकपुर, मोरङ
                    </p>
                    <div style={{ 
                        display: "inline-block", 
                        backgroundColor: "#fee2e2", 
                        color: "#991b1b", 
                        fontSize: "12px", 
                        fontWeight: "600", 
                        padding: "3px 10px", 
                        borderRadius: "20px", 
                        marginTop: "8px" 
                    }}>
                        School Portal Login
                    </div>
                </div>

                <div className="form-group">
                    <label className="login-label">Username</label>
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Enter username"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        autoComplete="username"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="login-label">Password</label>
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                    />
                </div>

                <div className="button-group">
                    <button 
                        className="login-button" 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>
                </div>

                {error && <p className="error">{error}</p>}

                <div className="signup-text">
                    <p>
                        Don't have an account?{" "}
                        <Link className="signup-link" to="/signin">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;