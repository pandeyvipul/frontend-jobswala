import React, { useState } from "react";
import "./Popup.css";

const Popup = ({ slotid, onClose }) => {
    console.log("Received slotid in Popup:", slotid);
    const [data, setData] = useState({ transid: "" });

    const handleInputChange = (e) => {
        setData({ ...data, transid: e.target.value });
    };

    const handleTransaction = async () => {
        try {
            const response = await fetch("http://localhost:4000/slotpayment/transanction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ slotid: slotid, transactionid: data.transid }),
            });

            const da = await response.json();
            console.log(data.success);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = async () => {
        console.log("Slot ID:", slotid);
        console.log("Transaction ID:", data.transid);
        await handleTransaction();
        onClose();
    };
    return (
        <div className="popup-container">
            <div className="popup-overlay">
                <div className="popup">
                    <button className="close-popup-btn" onClick={() => { onClose() }}>
                        ×
                    </button>
                    <h2>Enter Transaction ID</h2><br />
                    <input
                        style={{ width: "30vw", height: "20vh" }}
                        placeholder="Enter Transaction ID"
                        type="text"
                        value={data.transid}
                        onChange={handleInputChange}  // Corrected event handler
                    /><br />
                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                    <p>Transaction ID of payment!!</p>
                </div>
            </div>

        </div>
    );
};

export default Popup;