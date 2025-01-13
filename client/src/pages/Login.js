import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import backgroundVideo from "../media/2.mp4";
import "./Login.css";

import Navbar from "../components/Navbar";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { redirectTo, item } = location.state || {};
  const handleLogin = async (e) => {
    e.preventDefault();
    const BASE_URL = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });

      const token = response.data.token;

      // Set token and expiration time in localStorage
      const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hour
      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);

      // Set a timeout to log out after 1 hour
      setTimeout(() => {
        alert("Session expired. You have been logged out.");
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        navigate("/login");
      }, 60 * 60 * 1000);

      // Redirect to the specified page or home if no redirect info is present
      if (redirectTo) {
        navigate(redirectTo, { state: { item } }); // Redirect to character with its data
      } else {
        navigate("/");
      }
      // Store the token, navigate, or handle login success
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleRegisterRedirect = () => {
    // Redirect to the register page with the token and any redirect info
    navigate("/register", { state: { redirectTo, item } });
  };

  return (
    <div className="login-page">
      <video playsInline autoPlay loop muted className="videoBg-login">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <Navbar />
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form className="form-div" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <div className="register-link-div">
          Don't have an account?{" "}
          <button
            onClick={handleRegisterRedirect}
            className="register-redirect-button"
          >
            Register
          </button>{" "}
        </div>
      </div>
    </div>
  );
}

export default Login;
