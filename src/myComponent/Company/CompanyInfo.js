import React, { useEffect, useState } from "react";
import AlertPopup from "../AlertPopup";
import PulseLoader from "react-spinners/PulseLoader";
import "./CompanyInfo.css"; // Import the CSS file

const CompanyInfo = () => {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState({});
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fetchCompanyInfo = async () => {
    setLoading(true);
    try{
      const response = await fetch("https://backend-jobswala.onrender.com/company/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("authToken") }),
    });

    const data = await response.json();
    setCompany(data.data);
  }catch(error){
    console.error("Error fetching company info:", error);
  }finally{
    setLoading(false);
  }
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const Deletion = (company) => async () => {
    setLoading(true);
    try{
    const response = await fetch("https://backend-jobswala.onrender.com/deactivation/deletecompany", {
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
  }catch(error){
    console.error("Error deleting company:", error);
  }finally{
    setLoading(false);
  }
  }
  return (
    <>
    {loading ? (
      <div className="loader-container">
        <PulseLoader color="white" />
      </div>
    ):(
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
    )}</>
  );
};

export default CompanyInfo;
