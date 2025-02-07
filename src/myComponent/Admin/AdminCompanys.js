import React, { useState, useEffect } from 'react';
import './AdminStudents.css';

const AdminCompanys = () => {
  const [students, setStudents] = useState([]);

  const fetchCompanys = async () => {
    try {
      const response = await fetch('https://backend-jobswala.onrender.com/company/showdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setStudents(data.data);
    } catch (error) {
      console.error('Error fetching companys:', error);
    }
  };

  useEffect(() => {
    fetchCompanys();
  }, []);

  const Approve = async(student) => {
    
      try {
        const response = await fetch("https://backend-jobswala.onrender.com/Company/verify", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data : student }),
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          fetchCompanys();
        }
      } catch (error) {
        console.error('Error approving student:', error);
      }
  };


  return (
    <div className="admin-students">
      {students.length === 0 ? (
        <p className="no-students">No Companys found</p>
      ) : (
        students.map((student) => (
          <div key={student._id} className="student-card">
            <p className="student-name">Name: {student.name}</p>
            <p className="student-email">Email: {student.email}</p>
            <p className="student-phone">Phone: {student.phone}</p>
            <p className="student-address">Address: {student.address}</p>
            <p className="student-description">{student.description}</p>
            <a
              href={`https://backend-jobswala.onrender.com/resume/${student.docs}`}
              target="_blank"
              rel="noopener noreferrer"
              className="download-link"
            >
              Download Document
            </a>
            <div className="action-buttons">
              <button className="email-button" onClick={() => (window.location.href = `mailto:${student.email}`)}>Email</button>
              <button className="approve-button" onClick={()=>Approve(student)}>Approve</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminCompanys;
