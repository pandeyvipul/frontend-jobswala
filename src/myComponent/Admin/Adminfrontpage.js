import React from 'react'
import "./Adminfrontpage.css";
import { useNavigate } from 'react-router-dom';

const Adminfrontpage = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-container">
          <div className="admin-card" onClick={() => navigate('/admin/students')}>
            <h1>Student Verification</h1>
          </div>
          <div className="admin-card" onClick={() => navigate('/admin/companies')}>
            <h1>Company Verification</h1>
          </div>
          <div className="admin-card" onClick={() => navigate('/admin/complaints')}>
            <h1>Complaints</h1>
          </div>
          <div className="admin-card" onClick={() => navigate('/admin/deactivation')}>
            <h1>Deactivation of accounts</h1>
          </div>
        </div>
      );
  
}

export default Adminfrontpage
