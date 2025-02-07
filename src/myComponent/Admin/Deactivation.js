import React, { useState, useEffect } from "react";
import "./Deactivation.css"; // Add a separate CSS file for styling
import CompanyPopup from '../Student/CompanyPopup';
import StudentPopup from "../Company/StudentPopup";


const Deactivation = () => {
  const [data, setData] = useState([]);
  const [popup, setPopup] = useState({ isOpen: false, slotId: null });
  const [stupopup, setStupopup] = useState({ isOpen: false, slotId: null });

  const openPopup = (slotId) => {
    setPopup({ isOpen: true, slotId });
  };

  const closePopup = () => {
    setPopup({ isOpen: false, slotId: null });
  };

  const stuopenPopup = (slotId) => {
    setStupopup({ isOpen: true, slotId });
  };

  const stuclosePopup = () => {
    setStupopup({ isOpen: false, slotId: null });
  };
  const fetchData = async () => {
    try {
      const response = await fetch("https://backend-jobswala.onrender.com/deactivation/show", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      setData(result.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Deactivation = async (item) => {

    try {
      const response = await fetch("https://backend-jobswala.onrender.com/deactivation/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: item }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        console.log("Deactivation request sent successfully");
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="deactivation-container">
      <h1 className="heading">Deactivation Details</h1>
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item._id} className="card">
            <h2 className="card-title">{item.type}</h2>
            <h3 className="card-subtitle">{item.identifier}</h3>
            <h3 className="card-subtitle">{item.name}</h3>
            <p>Email: {item.email}</p>
            <p>Phone: {item.phone}</p>

            <h3 className="extra-details-heading">Extra Details:</h3>
            <div className="table-wrapper">
              <table className="details-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Company ID</th>
                    <th>Status</th>
                    <th>Slot ID</th>
                    <th>Student ID</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {item.slotdetails.map((slot, index) => (
                    <tr key={index}>
                      <td>{slot.slotdate}</td>
                      <td> <button
                        className="companyname"
                        style={{ border: "none", backgroundColor: "transparent" }}
                        onClick={() => openPopup(slot.companyid)}
                      >
                        <div>{slot.companyid}</div>
                      </button></td>
                      <td>{slot.PresentStatus ? "Pending" : "Paid"}</td>
                      <td>{slot.slotid}</td>
                      <td><button
                        className="companyname"
                        style={{ border: "none", backgroundColor: "transparent" }}
                        onClick={() => stuopenPopup(slot.studentid)}
                      >{slot.studentid}</button></td>
                      <td>{slot.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {popup.isOpen && (
                <CompanyPopup slotid={popup.slotId} onClose={closePopup} />
              )}
              {stupopup.isOpen && (
                <StudentPopup slotid={stupopup.slotId} onClose={stuclosePopup} />
              )}
            </div>

            <div className="buttons">
              <button
                className="email1-button"
                onClick={() => (window.location.href = `mailto:${item.email}`)}
              >
                Email
              </button>
              <button
                className="delete1-button"
                onClick={() => Deactivation(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default Deactivation;
