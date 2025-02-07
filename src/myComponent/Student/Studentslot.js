import React, { useEffect, useState, useRef } from 'react';
import "./Studentslot.css";
// import InfiniteScroll from 'react-infinite-scroll-component';
import AlertPopup from '../AlertPopup';
import CompanyPopup from './CompanyPopup';

const Studentslot = () => {
    const [slots, setSlot] = useState([]);
    const [bookedSlots, setBookedSlots] = useState({});
    const [popup, setPopup] = useState({ isOpen: false, slotId: null });
    const [page, setPage] = useState(1); // Current page for infinite scrolling
    const [hasMore, setHasMore] = useState(true);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const count = useRef(1);

    useEffect(() => {
        count.current = 1;
        fetchFunction();
    }, [page]);

    const studentCheck = async (slotId) => {
        try {
            const response = await fetch("http://localhost:4000/slot/checkstudent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    slotid: slotId,
                    studentid: localStorage.getItem("authToken"),
                }),
            });
            const data = await response.json();
            setBookedSlots((prevState) => ({
                ...prevState,
                [slotId]: data.success ? false : true,
            }));
        } catch (error) {
            console.error("Error checking student:", error);
        }
    };

    const makeChange = async (slotId) => {
        try {
            const response = await fetch("http://localhost:4000/slot/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    slotid: slotId,
                    studentid: localStorage.getItem("authToken"),
                }),
            });
            const data = await response.json();
            if (data.success) {
                setAlertMessage("Slot booked successfully!");
                setAlert(true);
                fetchFunction(); // Refresh the slots to get updated data
            } else {
                setAlertMessage("Failed to book the slot. Try again later.");
                setAlert(true);
            }
        } catch (error) {
            console.error("Error booking slot:", error);
        }
    };

    const updateSlotBookingStatus = async (slotsData) => {
        for (const slot of slotsData) {
            await studentCheck(slot._id); // Check and update the status of each slot
        }
    };

    const fetchFunction = async () => {
        try {
            const response = await fetch("http://localhost:4000/slot/bookpage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ page: page }), // Pass page correctly
            });

            const data = await response.json();
            if (!data.success) {
                setAlertMessage("Unable to fetch data... try later");
                setAlert(true);
                setHasMore(false);
            } else {
                if (data.data.length < 6) setHasMore(false);
                // setSlot((prevSlots) => [...prevSlots, ...data.data]);
                setSlot(data.data);
                updateSlotBookingStatus(data.data);
            }
        } catch (error) {
            console.error("Error fetching slots:", error);
        }
    };

    // const increNext = () => {
    //     setPage((prevPage) => prevPage + 1);
    // };

    const openPopup = (slotId) => {
        setPopup({ isOpen: true, slotId });
    };

    const closePopup = () => {
        setPopup({ isOpen: false, slotId: null });
    };

    const nextPage = () => {
        if (slots.length < 6) {
            console.log("No more slots available.");
        } else {
            count.current += 1;
            setPage(count.current);
        }
    }

    const prevPage = () => {
        if (count.current === 0) {
            console.log("No more slots available.");
        } else {
            count.current -= 1;
            setPage(count.current);
        }
    }

    return (
        <div>
            {/* <InfiniteScroll
                dataLength={slots.length}
                hasMore={hasMore}
                next={increNext}
                loader={<h4 style={{ textAlign: "center", color: "white" }}>Loading more slots...</h4>}
                endMessage={<p>No more slots available.</p>}
            > */}
            <div className="slots-container">
                {slots.map((slot) => (
                    <div className="slot-card" key={slot._id}>
                        <button
                            className="companyname"
                            onClick={() => openPopup(slot.companyid)}
                        >
                            <div>Company Name: {slot.companyname}</div>
                        </button>
                        <div>Description: {slot.descreption}</div>
                        <div>Availability: {slot.availability}</div>
                        <div>Location: {slot.location}</div>
                        <div>Date: {slot.date}</div>
                        <div>Time: {slot.time}</div>
                        {bookedSlots[slot._id] ? (
                            <div>Already Booked</div>
                        ) : slot.availability > 0 ? (
                            <div>
                                <div>Not Booked</div>
                                <button type="button" onClick={() => makeChange(slot._id)}>
                                    Book Now
                                </button>
                            </div>
                        ) : (
                            <div>Slots Full</div>
                        )}
                    </div>
                ))}
            </div>
            {popup.isOpen && (
                <CompanyPopup slotid={popup.slotId} onClose={closePopup} />
            )}
            <div className="pagination-container">
                {/* Previous Page Button */}
                <div className="pagination-button" onClick={prevPage}>
                    <span className="arrow left"></span>
                    <span>Previous</span>
                </div>

                {/* Next Page Button */}
                <div className="pagination-button" onClick={nextPage}>
                    <span>Next</span>
                    <span className="arrow right"></span>
                </div>
            </div>


            {alert && <AlertPopup message={alertMessage} onClose={() => setAlert(false)} />}

        </div>
    );
};

export default Studentslot;
