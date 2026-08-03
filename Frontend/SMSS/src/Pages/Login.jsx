import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState({
        name: "",
        password: ""
    });

    function submitForm(e) {
        e.preventDefault();
        console.log("Form submitted Successfully");
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
        <div>
            <form onSubmit={submitForm}>
                <div>
                    <label>Username</label><br />
                    <input
                        type="text"
                        placeholder="Enter username"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Password</label><br />
                    <input
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>

                <div>
                    <p>
                        Don't have an account? <Link to="/signin">Sign In</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;