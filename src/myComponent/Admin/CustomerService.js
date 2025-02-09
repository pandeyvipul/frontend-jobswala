import React, { useState, useEffect } from 'react';
import './CustomerService.css'; // Import the CSS file
import PulseLoader from 'react-spinners/PulseLoader';

const CustomerService = () => {
  const [complains, setComplains] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchComplains = async () => {
    setLoading(true);
    try{
    const response = await fetch('https://backend-jobswala.onrender.com/complain/getcomplain', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    console.log(data);
    setComplains(data);
  }
  catch(error){
    console.log(error);
  }finally{
    setLoading(false);
  }
  };

  const handleDone = async (complainId , input) => {
    // console.log(complainId, input);
    setLoading(true);
    try{
    const response = await fetch("https://backend-jobswala.onrender.com/complain/updatestatus", {
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
  catch(error){
    console.log(error); 
  }finally{
    setLoading(false);
  }
  }

  useEffect(() => {
    fetchComplains();
  }, []);

  return (<>
    {loading ? (<div className="loader-container"><PulseLoader color="white" /></div>) :(
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
    </div>)}</>
  );
};

export default CustomerService;
