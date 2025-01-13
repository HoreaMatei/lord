import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import RegisterPage from "./pages/Register";
import reportWebVitals from "./reportWebVitals";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<RegisterPage />} />{" "}
      {/* Registration Page */}
      <Route path="/login" element={<Login />} /> {/* Login Page */}
      <Route path="/main" element={<MainPage />} /> {/* Login Page */}
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
