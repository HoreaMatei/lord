import React, { useState, useEffect } from "react";
import { createUser, fetchUsers } from "../services/api";
import "../App.css";
import { useNavigate, useLocation } from "react-router-dom";
import backgroundVideo from "../media/2.mp4";
import "./Register.css";
import Navbar from "../components/Navbar";
const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { redirectTo, item } = location.state || {};

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        if (!data || data.length === 0) {
          console.log("No users found ");
        } else {
          setUsers(data);
        }
      } catch (error) {
        console.log("failed fetching data", error);
      }
    };

    getUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (
      !newUser.name.trim() ||
      !newUser.email.trim() ||
      !newUser.password.trim()
    ) {
      alert("Name, email, and password are required");
      return;
    }

    try {
      const response = await createUser(newUser);
      const token = response.token;
      const updatedUsers = await fetchUsers();

      setUsers(updatedUsers);

      setNewUser({ email: "", name: "", password: "" });
      alert("Registration successful! Redirecting to login.");
      navigate("/login", { state: { token, redirectTo, item } });
    } catch (error) {
      alert("Error adding user");
    }
  };

  return (
    <div className="register-page">
      <video playsInline autoPlay loop muted className="videoBg-register">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <Navbar />
      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <form className="register-form" onSubmit={handleAddUser}>
          <input
            type="text"
            value={newUser.name}
            placeholder="Add username"
            onChange={(e) => {
              setNewUser({ ...newUser, name: e.target.value });
            }}
          />
          <input
            type="email"
            value={newUser.email}
            placeholder="Add email"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            value={newUser.password}
            type="password"
            placeholder="Enter password"
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />

          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>

        <div className="register-link-div">
          Already have an account?{" "}
          <a href="/login" className="register-link">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
