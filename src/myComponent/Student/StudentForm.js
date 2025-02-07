import React, { useState, useEffect ,useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentForm.css"; // For external CSS file
import AlertPopup from "../AlertPopup";

export const StudentForm = () => {
  const fileInputRef = useRef(null); // Add a ref for the file input

  const navigate = useNavigate();
  const [alertOn, setAlertOn] = useState(false);
  const [file, setFile] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    description: "",
  });

  function isOlderThan18(dob) {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust the age if the birth month and day are ahead in the current year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }

    // Return true if the person is under 18
    return age < 18;
  }


  const validateError = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required'
    }
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

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    if (!formData.dob) {
      newErrors.dob = 'Birth date is required';
    } else if (isOlderThan18(formData.dob)) {
      newErrors.dob = 'Age should be more then 18 years';
    }

    if (!file) {
      newErrors.file = "File is required.";
    }
    return newErrors;
  }


  useEffect(() => {
    const savedData = localStorage.getItem("formdata");
    if (savedData) {
      setFormData(JSON.parse(savedData)); // Restore saved data to state
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setAlertMessage("No file selected!");
      setAlertOn(true);
      setFile(null);
      return;
    }
    if (selectedFile.size > 300000) {
      setAlertMessage("File size should be less than 300kb.");
      setAlertOn(true);
      setFile(null);
      return;
    }
  
    setFile(selectedFile); // Update file state
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateError();
  
    if (Object.keys(validationErrors).length === 0) {
      if (!localStorage.getItem("order")) {
        setAlertMessage("Please make payment first");
        setAlertOn(true);
        localStorage.setItem("formdata", JSON.stringify(formData));
      } else {
        let order = JSON.parse(localStorage.getItem("order"));
        const updatedData = { ...formData, orderid: order.id };
        const yedata = new FormData();
  
        // Append form data to FormData object
        yedata.append("name", formData.name);
        yedata.append("email", formData.email);
        yedata.append("password", formData.password);
        yedata.append("phone", formData.phone);
        yedata.append("dob", formData.dob);
        console.log(formData.description);
        yedata.append("description", formData.description);
        yedata.append("orderid", order.id);
  
        // Append file if it exists
        if (file) {
          yedata.append("resume", file);
        }
  
        try {
          const response = await fetch("https://backend-jobswala.onrender.com/student/create", {
            method: "POST",
            body: yedata,
          });
  
          const data = await response.json();
  
          if (data.success === false) {
            if (data.alreadyExists) {
              setAlertMessage("Student already exists!");
            } else {
              setAlertMessage("Registration failed!");
            }
            setAlertOn(true);
          } else {
            setAlertMessage("Registration successful! Please wait for approval. It may take up to 24 hours to get approved.");
            setAlertOn(true);
  
            // Clear local storage and reset form fields
            localStorage.removeItem("order");
            localStorage.removeItem("formdata");
            setFormData({
              name: "",
              email: "",
              password: "",
              phone: "",
              dob: "",
              description: "",
            });
  
            // Clear the file input
            if (fileInputRef.current) {
              fileInputRef.current.value = ""; // Clear file input using ref
            }
            setFile(null); // Reset the file state
          }
        } catch (error) {
          console.log(error);
          setAlertMessage("Registration failed!");
          setAlertOn(true);
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };
  

  const handleDirections = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("order")) {
      localStorage.setItem("formdata", JSON.stringify(formData));
      navigate("/payment");
    } else {
      setAlertMessage("Payment already made. You can proceed to registration.");
      setAlertOn(true);
    }
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Student Registration Form</h2>

      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      {errors.name && <p className="error">{errors.name}</p>}

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      {errors.email && <p className="error">{errors.email}</p>}
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      {errors.password && <p className="error">{errors.password}</p>}
      <label>
        Phone:
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>
      {errors.phone && <p className="error">{errors.phone}</p>}

      <label>
        Date of Birth:
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </label>
      {errors.dob && <p className="error">{errors.dob}</p>}

      <label>
        Description:
        <textarea
          type="textarea"
          name="description"
          className="textarea"
          value={formData.description}
          onChange={handleChange}
          style={{
            resize: 'none',
            width: '36vw',
            height: '20vh',
            maxWidth: '100vw',
            maxHeight: '100vh'
          }}
          required
        />
      </label>

      <label>
        Resume:
        <input
          type="file"
          name="resume"
          ref={fileInputRef} 
          onChange={handleFileChange}
          required
        />
        {errors.file && <p className="error">{errors.file}</p>}
      </label>
      <h6>Disclaimer : For Registration you have to pay Rs. 51</h6>
      <h6>By registering, you agree to our Terms of Service and Privacy Policy</h6>
      <button onClick={handleDirections}>Proceed with payment</button><br />
      <button type="submit" onClick={handleSubmit}>Submit</button><br />
      <button onClick={() => navigate("/login/students")}>Login</button>
      {alertOn && <AlertPopup message={alertMessage} onClose={() => setAlertOn(false)} />}
    </form>
  );
};


