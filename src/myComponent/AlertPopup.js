import React from "react";
import "./alertPopup.css"; // Add custom styles for the popup

const AlertPopup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <p style={{ color: "black" }}>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AlertPopup;
