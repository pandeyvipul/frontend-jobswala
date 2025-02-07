import React, { useState, useEffect } from 'react';
import './CustomerService.css'; // Import the CSS file

const CustomerService = () => {
  const [complains, setComplains] = useState([]);
  const [input, setInput] = useState('');

  const fetchComplains = async () => {
    const response = await fetch('http://localhost:4000/complain/getcomplain', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    console.log(data);
    setComplains(data);
  };

  const handleDone = async (complainId , input) => {
    console.log(complainId, input);

    const response = await fetch("http://localhost:4000/complain/updatestatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id :complainId , solution : input }),
    });

    if (response.ok) {
      console.log("Complain marked as done");
      fetchComplains();
    } else {
      console.error("Failed to mark complain as done");
    }
  }

  useEffect(() => {
    fetchComplains();
  }, []);

  return (
    <div className="customer-service">
      <h1 className="customer-service-title">Customer Service</h1>
      {complains.map((complain) => (
        <div className="complain-card" key={complain._id}>
          <h2 className="complain-name">{complain.Name}</h2>
          <p
            className="complain-email"
            onClick={() => {
              window.open(`mailto:${complain.email}`);
            }}
          >
            {complain.email}
          </p>
          <p className="complain-phone">{complain.phone}</p>
          <p className="complain-text">{complain.complain}</p>
          <input type= "textbox"  className="solution-input" placeholder="Solution" value={input} onChange={(e) => setInput(e.target.value)}/>
          <button className="complain-done-btn" onClick={() => handleDone(complain._id, input)}>Done</button>
        </div>
      ))}
    </div>
  );
};

export default CustomerService;
