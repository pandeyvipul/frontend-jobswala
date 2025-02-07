import React, { useEffect, useState } from "react";
import AlertPopup from "../AlertPopup";
import "./CompanyInfo.css"; // Import the CSS file

const CompanyInfo = () => {
  const [company, setCompany] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fetchCompanyInfo = async () => {
    const response = await fetch("http://localhost:4000/company/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("authToken") }),
    });

    const data = await response.json();
    setCompany(data.data);
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const Deletion = (company) => async () => {
    const response = await fetch("http://localhost:4000/deactivation/deletecompany", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: company }),
    });

    const data = await response.json();
    if (data.success) {
      setAlertMessage("Your account is in process of deletion ! You will get email once your account is deleted.");
      setAlert(true);
    }else{
      console.error("Error deleting company:", data.error);
    }
  }
  return (
    <div className="company-container">
      <div className="card">
        <h1 className="company-header">Company Information</h1>
        <div className="company-details">
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">{company.name || "N/A"}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{company.email || "N/A"}</span>
          </div>
          <div className="info-item">
            <span className="label">CEO:</span>
            <span className="value">{company.ceo || "N/A"}</span>
          </div>
          <div className="info-item">
            <span className="label">CIN:</span>
            <span className="value">{company.cin || "N/A"}</span>
          </div>
          <div className="info-item">
            <button className="delete-profile" onClick={Deletion(company)}>Delete Your Profile</button>
          </div>
        </div>
      </div>
      {alert && <AlertPopup message={alertMessage} onClose={() => setAlert(false)} />}
    </div>
  );
};

export default CompanyInfo;
