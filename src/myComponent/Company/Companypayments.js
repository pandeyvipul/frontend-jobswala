import React, { useEffect, useState } from "react";
import "./Companypayments.css"; // Import the CSS for styling
import Popup from "./Popup";

const Companypayments = () => {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectslotid, setselectslotid] = useState("");

  const markPaid = async (id) => {
    setselectslotid(id);
    console.log(selectslotid);
    setShowPopup(true);
  
  };

  const funFetch = async () => {
    try {
      let temp1 = localStorage.getItem("authToken");
      console.log(`Auth Token: ${temp1}`);
      const response = await fetch(
        "https://backend-jobswala.onrender.com/slotpayment/searchcompany",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            com: temp1,
          }),
        }
      );
      const data = await response.json();
      console.log("Fetched Data:", data);
      setData(data.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    funFetch();
  }, []);

  return (
    <div className="payments-container">
      {data.length === 0 ? (
        <p>No payments found for your company.</p>
      ) : (
        data.map((item) => (
          <div key={item._id} className="payment-card">
            <h3>Company Payments</h3>
            <p>
              <strong>Date:</strong> {item.slotdate}
            </p>
            <p>
              <strong>Amount:</strong> ₹{item.amount * item.studentid.length}
            </p>
            <h4>Students:</h4>
            <ul>
              {item.studentid?.map((studentId) => (
                <li key={studentId}>{studentId}</li>
              ))}
            </ul>
            <p>
              <strong>Payment Status:</strong>{" "}
              {item.PresentStatus ? (
                <span className="status-paid">Paid</span>
              ) : (
                <>
                <span className="status-unpaid">Not Paid</span>
               <button onClick={() => { markPaid(item._id) }}>Mark as Paid</button>
               </>)}
            </p>
          </div>
        ))
      )}
      {showPopup && selectslotid !== undefined && (
        <Popup
          slotid={selectslotid}
          onClose={() => {setShowPopup(false); funFetch();
          }}
        />
      )}

    </div>
  );
};

export default Companypayments;
