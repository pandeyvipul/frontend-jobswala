import React, { useState, useEffect ,useRef } from "react";
import { useNavigate } from "react-router-dom";
import AlertPopup from "../AlertPopup";
import "./CompanyForm.css";

export const CompanyForm = () => {
  const fileInputRef = useRef(null); // Add a ref for the file input
  
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    cin: "",
    phone: "",
    email: "",
    ceo: "",
    password: "",
  });

  // Load saved form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData)); // Restore saved form data
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData)); // Save to localStorage
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setAlertMessage("No file selected!");
      setAlert(true);
      setFile(null);
      return;
    }
    if (selectedFile.size > 300000) {
      setAlertMessage("File size should be less than 300kb.");
      setAlert(true);
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setFormData({ ...formData, image: selectedFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("order")) {
      setAlertMessage("Please make payment first");
      setAlert(true);
      return;
    } else {
      let order = JSON.parse(localStorage.getItem("order")); // Parse the string
      console.log(order);
      console.log(file);
      const uploadData = new FormData();
      // Append form data to FormData object
      uploadData.append("name", formData.name);
      uploadData.append("cin", formData.cin);
      uploadData.append("phone", formData.phone);
      uploadData.append("email", formData.email);
      uploadData.append("ceo", formData.ceo);
      uploadData.append("password", formData.password);
      if (file) {
        uploadData.append("docs", file);
      }else {
        uploadData.append("docs", null);
      }
      uploadData.append("orderid", order);

      for (let [key, value] of uploadData.entries()) {
        console.log(`${key}:`, value);
      }
      console.log("Data:", uploadData);
      try {
        const response = await fetch("http://localhost:4000/company/create", {
          method: "POST",
          body: uploadData,
        });

        const data = await response.json();
        console.log(data);

        if (data.success === false) {
          if (data.alreadyExists === true) {
            setAlertMessage("Company already exists!");
            setAlert(true);
          } else {
            setAlertMessage("Registration failed!");
            setAlert(true);
          }
        } else {
          console.log("Form Data Submitted: ", formData);
          setAlertMessage("Form Submitted Successfully! You can proceed to login after verification.");
          setAlert(true);
          localStorage.removeItem("order");
          localStorage.removeItem("formData");
          setFormData({
            name: "",
            cin: "",
            phone: "",
            email: "",
            ceo: "",
            password: "",
            image: null,
          });
          if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear file input using ref
          }
          setFile(null); 
        }
      }
      catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDirections = (e) => {
    e.preventDefault();

    if (!localStorage.getItem("order")) {
      localStorage.setItem("formData", JSON.stringify(formData));
      navigate("/payment");
    } else {
      setAlertMessage("Payment already made. You can proceed to registration.");
      setAlert(true);
    }
  };

  return (
    <form className="company-form" onSubmit={handleSubmit}>
      <h2>Company Registration Form</h2>

      <label>
        Company Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        CIN (Corporate Identification Number):
        <input
          type="text"
          name="cin"
          value={formData.cin}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Phone Number:
        <input
          type="mobile"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email Address:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          title="Please enter a valid email address"
        />
      </label>

      <label>
        CEO Name:
        <input
          type="text"
          name="ceo"
          value={formData.ceo}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Company Document:
        <input
          type="file"
          name="docs"
          ref={fileInputRef} 
          onChange={handleFileChange}
          required
        />
      </label>
      <h6>Disclaimer: For registration, you need to make a payment of Rs. 100</h6>
      <h6>Agree to terms and conditions</h6>

      <button type="button" onClick={handleDirections}>
        Proceed to Payment
      </button>
      <br />
      <button type="submit" onClick={handleSubmit}>Register Company</button>
      <br />
      <button onClick={() => navigate("/login/companys")}>Login</button>

      {alert && <AlertPopup message={alertMessage} onClose={() => setAlert(false)} />}
    </form>
  );
};
