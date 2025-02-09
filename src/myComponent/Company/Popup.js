import React, { useState } from "react";
import "./Popup.css";
import PulseLoader from "react-spinners/PulseLoader";

const Popup = ({ slotid, onClose }) => {
    console.log("Received slotid in Popup:", slotid);
    const [data, setData] = useState({ transid: "" });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setData({ ...data, transid: e.target.value });
    };

    const handleTransaction = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://backend-jobswala.onrender.com/slotpayment/transanction", {
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
        }finally{
            setLoading(false);
        }
    }
    const handleSubmit = async () => {
        console.log("Slot ID:", slotid);
        console.log("Transaction ID:", data.transid);
        await handleTransaction();
        onClose();
    };
    return (
        <>{loading ? <div className="loader-container"><PulseLoader color="#000000" /></div> : (
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
        )}</>
    );
};

export default Popup;