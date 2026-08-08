
import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";
import "../styles/register.css";


function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await registerUser(formData);

            alert(res.data.message);

            setFormData({
                fullName: "",
                email: "",
                password: "",
            });

        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };
    return (
        <div className="register-container">
            <div className="register-card">

                <h1>Create Account</h1>

                <form onSubmit={handleSubmit}>

                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                    />

                    <button type="submit">
                        Create Account
                    </button>

                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">Login Here</Link>
                </p>

            </div>
        </div>
    );
}

export default Register;