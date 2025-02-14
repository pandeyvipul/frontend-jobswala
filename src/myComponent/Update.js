import React, { useState } from 'react';
import AlertPopup from './AlertPopup'; 
import "./Update.css"; // Importing CSS file
import PulseLoader from 'react-spinners/PulseLoader';

const Update = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(""); // slotid
  const [input2, setInput2] = useState(""); // text value
  const [type, setType] = useState(""); // type
  const [file, setFile] = useState(null); // file value
  const [updatetype, setUpdatetype] = useState(""); // type like name, documents, etc.
  const [datacondition, setDatacondition] = useState(false);
  const [data, setData] = useState({}); // fetched data

  const [alertmessage , setALertmessage]= useState("");
  const [alert , setalert] = useState(false);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setALertmessage("No file selected");
      setalert(true);
      return;
    } else if (selectedFile.size > 300000) {
      setALertmessage("File size should be less than 300kb");
      setalert(true);
      return;
    }
    setFile(selectedFile);
  };

  const ApiFetching = async (e) => {
    e.preventDefault();
    if (updatetype === "file") {
      if (!file) {
        setALertmessage("No file selected");
        setalert(true);
        return;
      }
      const formData = new FormData();
      formData.append("docs", file);
      formData.append("id", input);
      setLoading(true);
      try{
      const response = await fetch(`https://backend-jobswala.onrender.com/${type}/update/file`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        resetForm();
        setInput(" ");
        setType(" ");
        setALertmessage("File updated successfully");
        setalert(true);
      
      }}catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    } else {
      if (!input2) {
        setALertmessage("No text entered");
        setalert(true);
        return;
      }
      setLoading(true);
      try{
      const response = await fetch(`https://backend-jobswala.onrender.com/${type}/update/others`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: input, type: updatetype, value: input2 }),
      });
      const data = await response.json();
      if (data.success) {
        setInput(" ");
        setType(" ");
       setALertmessage("Data updated successfully");
       setalert(true); 

      }
    }catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);}
    }
  };

  const fetchData = async (e) => {
    e.preventDefault();
    if (!input || !type) {
      setALertmessage("Please enter the credentials");
      setalert(true);
      return;
    }
    setLoading(true);
    try{
    const response = await fetch(`https://backend-jobswala.onrender.com/${type}/show`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: input }),
    });
    const data = await response.json();
    setData(data.data);
    setDatacondition(true);}
    catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDatacondition(false);
    setInput2("");
    setData({});
    setInput("");
    setFile(null);
  };

  return (
    <>{loading ? (<div className="loader-container"><PulseLoader color="white" /></div>) : (
    <div className="update-container">
      <div className="search-section">
        <input
          type="text"
          className="input-field"
          placeholder="Enter ID"
          onChange={(e) => setInput(e.target.value)}
        />
        <select className="dropdown" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="" disabled>Select Type</option>
          <option value="company">Company</option>
          <option value="student">Student</option>
        </select>
        <button className="search-button" onClick={fetchData}>Search</button>
      </div>
      <div className="update-section">
        {!datacondition ? (
          <h1 className="not-available">Not available</h1>
        ) : (
          <>
          <div className="data-section">
            <h1 className="data-title">{data.name}</h1>
            <p className="data-info">{data.phone}</p>
            <p className="data-info">{data.email}</p>
            {type === "company" &&<a href={data.docs} className="download-link">Download Documents</a>}
            {type === "student" &&<a href={data.resume} className="download-link">Download Documents</a>}
          </div>
            <div className="update-form">
              <select className="dropdown" value={updatetype} onChange={(e) => setUpdatetype(e.target.value)}>
                <option value="" disabled>Select an option</option>
                {type === "company" && <option value="cin">CIN</option>}
                {type === "student" && (
                  <>
                    <option value="email">Email</option>
                    <option value="address">Address</option>
                  </>
                )}
                <option value="file">Document</option>
                <option value="name">Name</option>
                <option value="phone">Phone Number</option>
              </select>
              {updatetype === "file" ? (
                <input type="file" className="file-input" onChange={handleFileChange} />
              ) : (
                <input type="text" className="input-field" placeholder="Enter the value" value={input2} onChange={(e) => setInput2(e.target.value)} />
              )}
              <button className="update-button" onClick={ApiFetching}>Update</button>
            </div>
          </>
        )}
      </div>
      {alert && <AlertPopup message={alertmessage} onClose={() => {setalert(false); window.location.reload();}} />}
      </div>
      )}</>
  );
};

export default Update;