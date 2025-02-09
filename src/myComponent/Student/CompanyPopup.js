import React, { useState, useEffect } from 'react';
import './CompanyPopup.css';
import PulseLoader from 'react-spinners/PulseLoader';

const CompanyPopup = ({ slotid, onClose }) => {
    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(false);
    const fetchCompanyInfo = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://backend-jobswala.onrender.com/company/findcompany", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: slotid }),
            });

            const data = await response.json();
            setCompany(data.data);
        } catch (error) {
            console.error("Error fetching company data:", error);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanyInfo();
    }, []);

    return (
        <>{loading ? (<div className="loader-container"><PulseLoader color="white" /></div>) : (
        <div className="company-popup-container">
            <div className="company-popup">
                <button className="company-close-popup-btn" onClick={onClose}>
                    ×
                </button>
                <div className="company-popup-header">
                    <h2>{company.name}</h2>
                </div>
                <div className="company-popup-contents">
                    {/* Content Section 1 */}
                    <div className="company-popup-content">
                        <h3>Contact Details</h3>
                        <p><strong>Address:</strong> {company.address}</p>
                        <p><strong>Phone:</strong> <a href={`tel:${company.phone}`}>{company.phone}</a></p>
                        <p><strong>Email:</strong> <a href={`mailto:${company.email}`}>{company.email}</a></p>
                    </div>

                    {/* Content Section 2 */}
                    <div className="company-popup-content">
                        <h3>Additional Information</h3>
                        <p><strong>Website:</strong><a href={company.website|| "N/A"} target="_blank" rel="noopener noreferrer">{company.website|| "N/A"}</a></p>
                        <p><strong>Founded:</strong> {company.ceo|| "Unknown"}</p>
                        <p><strong>Description:</strong> {company.description || "No description available."}</p>
                    </div>
                </div>
            </div>
        </div>
        )}</>
    );
};

export default CompanyPopup;
