import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Company/Companylogin.css"; // For external CSS file
import AlertPopup from "../AlertPopup";
export const Studentlogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState(false);
  const[alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    try {
      const response = await fetch("http://localhost:4000/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        setAlertMessage("Login failed!");
        setAlert(true);
      } else {
        localStorage.setItem("authToken", data.authToken);
        localStorage.setItem("student", true);
        setAlertMessage("Login successful!");
        await setAlert(true);
        window.location.href = "/logged/students";
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };


return (
  <>
  <form className="login-form" onSubmit={handleSubmit}>
    <h2 className="login-form-title">Login</h2>

    <label className="login-form-label">
      Email:
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="login-form-input"
        required
      />
    </label>

    <label className="login-form-label">
      Password:
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="login-form-input"
        required
      />
    </label>

    <button type="submit" className="login-form-button">
      Login
    </button>
    <button className="login-form-button" onClick={() => navigate("/login/students/register")}>
      Register Yourself
    </button>

  </form>
    {alert && <AlertPopup message={alertMessage} onClose={() => setAlert(false)} />}
</>);
};

