import React from 'react'
import { useState } from 'react';
import './Studentcomplain.css'
import AlertPopup from "../AlertPopup";
import PulseLoader from "react-spinners/PulseLoader";

const Studentcomplain = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }


    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    }
    else if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch('https://backend-jobswala.onrender.com/complain/complaincreate', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(formData),
        })

        const data = await response.json();
        if (data.success === false) {
          setAlertMessage("Unable to send complain");
          setAlert(true);
        } else {
          console.log("Success true");
          setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
          setAlertMessage("Complain sent successfully");
          setAlert(true);
          setSubmitted(true);
        }
      }
      catch (error) {
        console.log(error)
      }finally{
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>{loading ? (<div className="loader-container"><PulseLoader color="white" /></div>) : (
    <div className="contact-us-form">
      <h2>Customer Support</h2>
      {submitted && <p>Thank you for contacting us! We will get back to you soon.</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone">Phone :</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="message">Your Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here"
            style={{ resize: 'none', height: '150px' }}
          />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      {alert && <AlertPopup message={alertMessage} onClose={() => setAlert(false)} />}
    </div>
    )}</>
  );
}

export default Studentcomplain
