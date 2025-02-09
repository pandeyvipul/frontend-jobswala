import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import "./Companylogin.css"; // For external CSS file
import AlertPopup from "../AlertPopup";

const Companylogin = () => {
  const [alert, setAlert] = useState(false);
  const[alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    setLoading(true);
    try {
      const response = await fetch("https://backend-jobswala.onrender.com/company/login", {
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
        localStorage.setItem("authToken",data.authToken);
        localStorage.setItem("company", true);
        setAlertMessage("Login successful!");
        await setAlert(true);  
        window.location.href = "/logged/companys";
      }

    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
    {loading ? (<div className="loader-container"><PulseLoader color="#36d7b7" /></div>) :(
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
      <button  className="login-form-button" onClick={() => navigate("/login/companys/register")}>
        Register Yourself
      </button>

      {alert && <AlertPopup message={alertMessage} onClose={() => setAlert(false)} />}
    </form>)
}
    </>
  );
};



export default Companylogin;