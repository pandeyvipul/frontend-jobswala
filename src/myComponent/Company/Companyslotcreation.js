import React, { useState } from "react";
import AlertPopup from "../AlertPopup";
import "./Companyslotcreation.css"; // Scoped to SlotForm component only.

const Companyslotcreation = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [formData, setFormData] = useState({
    authToken: "",
    location: "",
    time: "",
    date: "",
    amount: "",
    skills: "",
    description: "",
    availability: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(formData.date) <= new Date(Date.now() + 24 * 60 * 60 * 1000)) {
      setPopupMessage("Date selected should be at least one day in the future. Please select a valid date.");
      setShowPopup(true);
      return;
    }
    const formattedData = {
      ...formData,
      authToken: localStorage.getItem("authToken"),
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      availability: parseInt(formData.availability, 10),
      students: formData.students ? JSON.parse(formData.students) : null,
    };
    console.log("Submitted Data:", formattedData);

    try {
      console.log("Submitted Data:", formattedData);
      const response = await fetch("http://localhost:4000/slot/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      })
      const data = await response.json();
      if (data.success === false) {
        setPopupMessage("Slot creation failed!");
        setShowPopup(true);
      } else {
        setFormData({
          authToken: "",
          location: "",
          time: "",
          amount:"",
          date: "",
          skills: "",
          description: "",
          availability: "",
        })
        setPopupMessage("Slot created successfully!");
        setShowPopup(true);
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="slotForm-container">
      <h2 className="slotForm-title">Create Slot</h2>
      <form onSubmit={handleSubmit}>

        <div className="slotForm-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter Location"
            required
          />
        </div>
        <div className="slotForm-group">
          <label htmlFor="time">Day</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Enter Days"
            required
          />
        </div>
        <div className="slotForm-group">
          <label htmlFor="time">Time</label>
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Enter Time (e.g., 10:00 AM)"
            required
          />
        </div>

        <div className="slotForm-group">
          <label htmlFor="skills">Skills (Comma-separated)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Enter Skills (e.g., JavaScript, Node.js)"
            required
          />
        </div>

        <div className="slotForm-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Slot Description"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="slotForm-group">
          <label htmlFor="availability">Availability</label>
          <input
            type="number"
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="Number of Slots Available"
            required
          />
        </div>
        <div className="slotForm-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
          />
        </div>
        <button type="submit" className="slotForm-submit">
          Submit
        </button>
      </form>
      {showPopup && <AlertPopup message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Companyslotcreation;
