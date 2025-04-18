import React, { useState } from "react";
import "../style/login.css";
import logo from "/src/assets/Headerlogo.webp";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const staticCredentials = {
    email: "admin@gmail.com",
    password: "admin123",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.email === staticCredentials.email &&
      formData.password === staticCredentials.password
    ) {
      setMessage("Login successful!");
      setTimeout(() => {
        navigate("/booking");
      }, 1000);
    } else {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="login-box">
        <div className="logo-section">
          <img src={logo} alt="Logo" className="logo-image" />
          <h1>CAT DASHBOARD</h1>
        </div>
        <div className="form-section">
          <h2>LOGIN</h2>

          {/* ✅ Connect form to handleSubmit */}
          <form onSubmit={handleSubmit}>
            {/* ✅ Connect input to formData and handleChange */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="remember-row">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me logged in</label>
            </div>
            <button type="submit">Log in</button>
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </form>

          {/* Optional: Show login message */}
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
