import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const Payment = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const eventId = params.get("event");

    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState(1);
    const [attendees, setAttendees] = useState([{ name: "", gender: "" }]);

    useEffect(() => {
        if (eventId) {
            axios.get(`http://localhost:5000/events/${eventId}`)
                .then((response) => {
                    console.log("Event Data:", response.data); // Debugging log
                    setEvent(response.data);
                })
                .catch((error) => console.error("Error fetching event:", error));
        }
    }, [eventId]);
    

    useEffect(() => {
        setAttendees(Array.from({ length: tickets }, () => ({ name: "", gender: "" })));
    }, [tickets]);

    if (!event) return <p>Loading payment details...</p>;

    const totalAmount = event.price * tickets + 50; // Platform fee

    const handlePayment = async (token) => {
        try {
            const response = await axios.post("http://localhost:5000/payment", {
                amount: totalAmount,
                token,
            });

            if (response.data.success) {
                alert("Payment Successful! 🎉");
            }
        } catch (error) {
            alert("Payment Failed: " + error.message);
        }
    };

    const handleAttendeeChange = (index, field, value) => {
        const updatedAttendees = [...attendees];
        updatedAttendees[index][field] = value;
        setAttendees(updatedAttendees);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
            <h2>Payment</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
                {/* Left Section - User Details */}
                <div>
                    <h3>Details</h3>
                    <label>Number of Tickets:</label>
                    <input
                        type="number"
                        value={tickets}
                        min="1"
                        onChange={(e) => setTickets(parseInt(e.target.value))}
                        style={{ width: "50px", margin: "10px 0" }}
                    />

                    {attendees.map((attendee, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <input
                                type="text"
                                placeholder={`Name of Attendee ${index + 1}`}
                                value={attendee.name}
                                onChange={(e) => handleAttendeeChange(index, "name", e.target.value)}
                                style={{ display: "block", width: "100%", marginBottom: "5px" }}
                            />
                            <label>
                                <input
                                    type="radio"
                                    name={`gender-${index}`}
                                    value="Male"
                                    checked={attendee.gender === "Male"}
                                    onChange={() => handleAttendeeChange(index, "gender", "Male")}
                                /> Male
                            </label>
                            <label style={{ marginLeft: "10px" }}>
                                <input
                                    type="radio"
                                    name={`gender-${index}`}
                                    value="Female"
                                    checked={attendee.gender === "Female"}
                                    onChange={() => handleAttendeeChange(index, "gender", "Female")}
                                /> Female
                            </label>
                            <label style={{ marginLeft: "10px" }}>
                                <input
                                    type="radio"
                                    name={`gender-${index}`}
                                    value="Other"
                                    checked={attendee.gender === "Other"}
                                    onChange={() => handleAttendeeChange(index, "gender", "Other")}
                                /> Other
                            </label>
                        </div>
                    ))}

                    <input type="text" placeholder="Enter Phone Number" style={{ width: "100%", marginTop: "10px" }} />
                </div>

                {/* Middle Section - Order Summary */}
                <div>
                    <h3 style={{textAlign: "center", textDecoration: "underline", textDecorationColor: "red" }}>Order Summary</h3>
                    <p style={{textAlign: "center", color: "red" }}><strong>{event.title}</strong></p>
                    <p style={{textAlign: "center"}}>Price Of Event: {event.price}</p>
                    <p style={{textAlign: "center"}}><h3>Total: ₹{event?.price ? totalAmount : "Calculating..."}</h3></p>
                    <h3 style={{textAlign: "center"}}>{tickets} Tickets</h3>
                    <p style={{textAlign: "center"}}>Platform Fees: ₹50</p>
                    <h3 style={{textAlign: "center"}}>Total: ₹{totalAmount}</h3>
                </div>

                {/* Right Section - Payment */}
                <div>
                    <h3>Payment</h3>
                    <StripeCheckout
                        stripeKey="pk_test_your_stripe_public_key"
                        token={handlePayment}
                        amount={totalAmount * 100}
                        name="Event Ticket"
                        currency="INR"
                    >
                        <button style={{ background: "#007bff", color: "white", padding: "10px", cursor: "pointer", width: "100%" }}>
                            Pay INR {totalAmount}
                        </button>
                    </StripeCheckout>
                </div>
            </div>
        </div>
    );
};

export default Payment;
