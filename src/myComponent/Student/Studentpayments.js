import React, { useEffect, useState } from 'react';
import './Studentpayments.css';

const Studentpayments = () => {
  const [data, setData] = useState([]);
  
  const funFetch = async () => {
    try {
      let temp1 = localStorage.getItem("authToken");
      console.log(temp1);
      const response = await fetch('http://localhost:4000/slotpayment/searchstudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          com: temp1
        })
      });
      const data = await response.json();
      console.log(data);
      setData(data.data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    funFetch();
  }, []);

  return (
    <div className="payment-container">
      {data.map((item, index) => (
        console.log(item),
        <div className="payment-card" key={index}>
          <div className="company-name">Company Name: {item.companyname}</div>
          <div className="date">Date: {item.slotdate}</div>
          <div className="amount">Amount: {item.amount}</div>
          <div className="status">
            Status:{" "}
            {item.PresentStatus ? (<>
              <span className="status-done">Done</span><br />
              <span className="status-done">Transaction ID: {item.transactionID}</span></>
            ) : (
              <span className="status-pending">Pending</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Studentpayments;
