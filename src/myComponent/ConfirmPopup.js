import React from "react";
import "./ConfirmPopup.css";

export const ConfirmPopup = ({ show, message, onConfirm, onCancel }) => {
  if (!show) return null; // Only render the modal when `show` is true

  return (
    <div className="confirm-overlay">
      <div className="confirm-container">
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button onClick={onCancel} className="confirm-button confirm-cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="confirm-button confirm-confirm">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


