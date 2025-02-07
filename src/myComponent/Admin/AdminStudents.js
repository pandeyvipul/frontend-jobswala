import React, { useState, useEffect } from 'react';
import './AdminStudents.css';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('https://backend-jobswala.onrender.com/student/showdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setStudents(data.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const Approve = async(student) => {
    
      try {
        const response = await fetch("https://backend-jobswala.onrender.com/student/verify", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data : student }),
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          fetchStudents();
        }
      } catch (error) {
        console.error('Error approving student:', error);
      }
  };


  return (
    <div className="admin-students">
      {students.length === 0 ? (
        <p className="no-students">No students found</p>
      ) : (
        students.map((student) => (
          <div key={student._id} className="student-card">
            <p className="student-name">Name: {student.name}</p>
            <p className="student-email">Email: {student.email}</p>
            <p className="student-phone">Phone: {student.phone}</p>
            <p className="student-address">Address: {student.address}</p>
            <p className="student-dob">DOB: {student.dob}</p>
            <p className="student-description">{student.description}</p>
            <a
              href={`https://backend-jobswala.onrender.com/resume/${student.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="download-link"
            >
              Download CV
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

export default AdminStudents;
