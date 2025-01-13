import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="nav11">
      <button
        className="home"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>

      <div className="account">
        {isAuthenticated ? (
          <button className="home" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <button
              className="home"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              className="home"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
