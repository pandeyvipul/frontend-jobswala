import React, { useState } from 'react';
import AlertPopup from '../AlertPopup';


const Companyothers = () => {
  const [formData, setFormData] = useState({
    website: '',
    description: '',
    address:''
  });
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!(formData.website.includes('.com') || formData.website.includes('.in') || formData.website.includes('.vercel.app'))) {
      setAlertMessage('The website URL must include ".com", ".in", or ".vercel.app". Please enter a valid website.');
      setAlert(true);
      return;
  }
  
    const updateFormData = {
      website: formData.website,
      description: formData.description,
      address: formData.address,
      token: localStorage.getItem('authToken')
    }
    console.log('Form Submitted:', formData);
    const response = await fetch('http://localhost:4000/company/updatecompany', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateFormData),
    }
  );
  
    const data = await response.json();
    if (data.success === false) {
      setAlertMessage('Update failed! Please try after sometime.');
      setAlert(true);
    }else{
      setAlertMessage('Update successful!');
      setAlert(true);
      setFormData({
        website: '',
        description: '',
        address: ''
      })
    }
  };

  const handleData = async() => {
    const response = await fetch('http://localhost:4000/company/finddetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: localStorage.getItem('authToken') }),
    });
    const data = await response.json();
    setAlertMessage(JSON.stringify(data.data));
    setAlert(true);
  }
      

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '20px auto' ,backgroundColor: '#f5f5f5'}}>
      <h2>Update Company Details</h2><br/>
      <p>This is the additional information which is displayed to the student</p><br/>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            placeholder="Enter your company website"
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' ,borderStyle: 'none' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="website">Head Office Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            placeholder="Enter your Head Office Address"
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' ,borderStyle: 'none' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            placeholder="Provide a description"
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              height: '80px',
              resize: 'none',
              borderStyle: 'none'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            
          }}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleData}
          style={{
            padding: '10px 20px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            
          }}
        >
        Previous Details
        </button>
        {alert && <AlertPopup message={alertMessage} onClose={() => setAlert(false)} />}
      </form>
    </div>
  );
};

export default Companyothers;
