import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventList = ({ selectedCategory, searchQuery }) => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/events")
            .then((response) => {
                console.log("Fetched Events:", response.data);
                let filteredEvents = response.data;

                // ✅ Filter events based on category
                if (selectedCategory) {
                    filteredEvents = filteredEvents.filter(event => event.category === selectedCategory);
                }

                // ✅ Apply search filtering from Navbar
                if (searchQuery.trim()) {
                    filteredEvents = filteredEvents.filter(event => 
                        event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        event.location.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                }

                setEvents(filteredEvents);
            })
            .catch((error) => console.error("Error fetching events:", error));
    }, [selectedCategory, searchQuery]); // ✅ Trigger when category or search query changes

    return (
        <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
            <h2 style={{ textAlign: "center", color: "green" }}>
                ......{selectedCategory ? `${selectedCategory} Events` : "All Events"}......
            </h2>

            {events.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                    {events.map((event) => (
                        <div 
                            key={event._id} 
                            style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px" }}
                        >
                            {event.image && (
                                <img
                                    src={`http://localhost:5000/${event.image.replace(/\\/g, "/")}`}
                                    alt={event.title}
                                    style={{
                                        width: "100%", 
                                        height: "150px", 
                                        objectFit: "cover", 
                                        borderRadius: "5px", 
                                        cursor: "pointer"
                                    }}
                                    onClick={() => navigate(`/event/${event._id}`)}
                                />
                            )}

                            <h3 style={{ textAlign: "center", color: "blue" }}>
                                <strong>Title: </strong>{event.title}
                            </h3>
                            <p style={{ textAlign: "center" }}><strong>Description:</strong> {event.description}</p>
                            <p style={{ textAlign: "center" }}>📅 <strong>Date:</strong> {event.date || "TBD"}</p>
                            <p style={{ textAlign: "center" }}>💰 <strong>Price:</strong> ₹{event.price || "Free"}</p>
                            <p style={{ textAlign: "center" }}>⏲️ <strong>Time:</strong> {event.time}</p> 
                            <p style={{ textAlign: "center" }}>📍 <strong>Location:</strong> {event.location}</p>
                            <p style={{ textAlign: "center" }}>📍 <strong>Country:</strong> {event.country}</p>
                            <p style={{ textAlign: "center" }}>🏷 <strong>Category:</strong> {event.category || "General"}</p>

                            <button 
                                onClick={() => navigate(`/event/${event._id}`)} 
                                style={{
                                    display: "block",
                                    margin: "10px auto",
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    background: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px"
                                }}
                            >
                                🔍 View Details
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}>
                    No events found
                </p>
            )}


            <div className="chat-icon">💬</div>

        </div>
    );
};

export default EventList;
