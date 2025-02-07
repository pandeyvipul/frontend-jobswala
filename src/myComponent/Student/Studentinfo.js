import React, { useEffect, useState } from 'react'
import AlertPopup from "../AlertPopup";
import "./Studentinfo.css"

const Studentinfo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [student, setStudent] = useState({});

  const fetchStudent = async () => {
    try {
      const response = await fetch("http://localhost:4000/student/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: localStorage.getItem("authToken") }),
        }
      );
      const data = await response.json();
     console.log(data);
      setStudent(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchStudent();
  }, []);

  const Deletion = async (student) => {
    try {
      const response = await fetch("http://localhost:4000/deactivation/deletestudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: student }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
       setAlertMessage("Your account is in process of deletion ! You will get email once your account is deleted."); 
       setShowPopup(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="student-profile">
  {/* Profile Section */}
  <div className="profile-header">
    <div className="profile-svg">
      {/* SVG icon for profile */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="100"
        height="100"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M12 14c-6.075 0-10 3-10 6v1h20v-1c0-3-3.925-6-10-6z" />
      </svg>
    </div>
    <h2>{student.name}</h2>
    <p>{student.tagline || "Aspiring Professional"}</p>
  </div>

  {/* Contact Details */}
  <div className="section-box contact-details">
    <h3>Contact Information</h3>
    <p>
      <strong>Email:</strong>{" "}
      <a href={`mailto:${student.email}`}>{student.email}</a>
    </p>
    <p>
      <strong>Phone:</strong>{" "}
      <a href={`tel:${student.phone}`}>{student.phone}</a>
    </p>
  </div>

  {/* Skills Section */}
  <div className="section-box skills">
    <h3>Skills</h3>
    <ul>
      <li style={{listStyleType:"none"}}>Skill 1</li>
      <li style={{listStyleType:"none"}}>Skill 2</li>
    </ul>
  </div>

  {/* Projects */}
  <div className="section-box projects">
    <h3>Projects</h3>
    <p>{student.description}</p>
  </div>

  {/* Resume Section */}
  <div className="section-box resume">
    <h3>Resume</h3>
    <div className="resume-options">
      <a
        href={`https://backend-jobswala.onrender.com/resume/${student.resume}`}
      >
        <button className="resume-btn">
        Download Resume
        </button>
      </a>
    </div>
  </div>

  {/* Delete Profile */}
  <button
    className="delete-profile"
    onClick={() => Deletion(student)}
  >
    Delete Your Profile
  </button>
  {showPopup && <AlertPopup message={alertMessage} onClose={() => setShowPopup(false)} />}
</div>

  );

}

export default Studentinfo
