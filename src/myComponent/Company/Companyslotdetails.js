// todo in this is pagination
import React, { useEffect, useState , useRef} from 'react'
import "./Companyslotdetails.css"
import StudentPopup from './StudentPopup'

const Companyslotdetails = () => {
  const [slot, setslot] = useState([])
  const [popup, setPopup] = useState(false);
  const [slotid, setslotid] = useState("");
  const [showmore, setShowmore] = useState(true);

  const page = useRef(1);

  const slotDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/slot/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        page.current = 1; // Reset the page to fetch from the first page
        setslot([]); // Clear current slots
        await fetchFunction(); // Fetch updated data
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fetchFunction = async () => {
    try {
      let temp = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:4000/slot/slotdetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: temp ,page:page.current}),
      });
      const data = await response.json();
      if (data.data.length < 3) setShowmore(false);
      setslot((prevSlot) => [...prevSlot, ...data.data]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFunction();
  }, [])
  return (
    <div className="slot-container">
      <h1>Company Slot Details</h1>
      {slot.map((item, index) => (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <table key={index} className="slot-table">
            <tbody>
              <tr>
                <td className="slot-label">Location:</td>
                <td className="slot-value">{item.location}</td>
              </tr>
              <tr>
                <td className="slot-label">Date:</td>
                <td className="slot-value">{item.date}</td>
              </tr>
              <tr>
                <td className="slot-label">Time:</td>
                <td className="slot-value">{item.time}</td>
              </tr>
              <tr>
                <td className="slot-label">Availability:</td>
                <td className="slot-value">{item.availability}</td>
              </tr>
              <tr>
                <td className="slot-label">Students:</td>
                <td className="slot-value">
                  {item.students.map((student, studentIndex) => (
                    <div key={studentIndex}><button className="student-button" onClick={() => { console.log(student.id); setslotid(student.id); setPopup(true) }}>{student.name}</button></div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          <button className="delete-button" onClick={() => { slotDelete(item._id); console.log("Deleted ID:", item._id)}}>Delete</button>
          {popup && <StudentPopup slotid={slotid} onClose={() => setPopup(false)} />}
        </div>
      ))}
      {showmore &&
      <div className="button-container">
        <button
          className="showmore-button"
          onClick={() => { page.current++; fetchFunction() }}
        >
          +
        </button>
      </div>
      }
    </div>

  )
}

export default Companyslotdetails
