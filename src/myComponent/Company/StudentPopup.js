import React, { useState, useEffect } from 'react';
import './StudentPopup.css';
import PulseLoader from 'react-spinners/PulseLoader';

const StudentPopup = ({ slotid, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState({});

    const fetchStudent = async () => {
        setLoading(true);
        try {

    const response = await fetch("https://backend-jobswala.onrender.com/student/findstudent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: slotid }),
            });
            const data = await response.json();
            console.log(data);
            setStudent(data.data);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    return (
        <>{loading ? (<div className="loader-container"><PulseLoader color="white" /></div>):(
        <div className="student-popup-container">
            <div className="student-popup">
                <button className="close-popup-btn" onClick={onClose}>
                    ×
                </button>
                <h2>Student Information</h2>
                <br />
                {/* Profile Section */}
                <div className="student-profile-header">
                    <div className="student-profile-svg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="50"
                            height="50"
                        >
                            <circle cx="12" cy="8" r="4" />
                            <path d="M12 14c-6.075 0-10 3-10 6v1h20v-1c0-3-3.925-6-10-6z" />
                        </svg>
                    </div>
                    <h2>{student.name}</h2>
                    <p>{student.tagline || "Aspiring Professional"}</p>
                </div>

                {/* Contact Details */}
                <div className="student-contact-details">
                    <h3>Contact Information</h3>
                    <p>
                        <strong>Email:</strong>{' '}
                        <a href={`mailto:${student.email}`}>{student.email}</a>
                    </p>
                    <p>
                        <strong>Phone:</strong>{' '}
                        <a href={`tel:${student.phone}`}>{student.phone}</a>
                    </p>
                </div>

                {/* Skills */}
                <div className="student-skills">
                    <h3>Skills</h3>
                    <ul>
                        <li>Skill 1</li>
                    </ul>
                </div>

                {/* Projects */}
                <div className="student-projects">
                    <h3>{student.description}</h3>
                </div>
                <a href={student.resume}>Download CV</a>
            </div>
        </div>
        )}</>
    );
};

export default StudentPopup;
