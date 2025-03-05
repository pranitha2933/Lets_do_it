import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/EventDetails.css";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;  // Secure API key

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/events/${id}`)
            .then((response) => setEvent(response.data))
            .catch((error) => {
                console.error("Error fetching event details:", error);
                setError("Failed to load event details. Please try again later.");
            });
    }, [id]);

    if (error) return <p className="error-message">{error}</p>;
    if (!event) return <p className="loading-message">Loading event details...</p>;

    return (
        <div className="event-details-container">
            {/* Event Banner */}
            <div className="event-banner">
                {event.image ? (
                    <img 
                        src={`http://localhost:5000/${event.image.replace(/\\/g, "/")}`} 
                        alt={event.title} 
                        className="event-image" 
                    />
                ) : (
                    <p className="no-image">No Image Available</p>
                )}
            </div>

            {/* Event Content */}
            <div className="event-content">
                <h2 className="event-title">
                    {event.title} <span className="share-icon">🔗</span>
                </h2>

                <p className="event-description">
                    {expanded ? event.description : `${event.description.substring(0, 100)}...`}
                </p>
                <button className="read-more" onClick={() => setExpanded(!expanded)}>
                    {expanded ? "Read Less" : "Read More"}
                </button>

                {/* Event Info */}
                <div className="event-info">
                    <div className="event-date-time">
                        <p>💰 Price: {event.price || "Not Provided"}</p>
                        <p>📅 Date: {event.date || "Not Provided"}</p>
                        <p>🕒 Time: {event.time || "Not Provided"}</p>
                    </div>
                    <div className="event-location">
                        <p>📍 Location: {event.location}</p>
                        <p>🌍 Country: {event.country}</p>
                        {event.location && (
                            <>
                                <button className="map-link" onClick={() => setShowMap(!showMap)}>
                                    {showMap ? "Hide Map ▲" : "Show Map ▼"}
                                </button>
                                {showMap && GOOGLE_MAPS_API_KEY ? (
                                    <iframe
                                        title="Google Map"
                                        width="100%"
                                        height="300"
                                        frameBorder="0"
                                        style={{ borderRadius: "10px", marginTop: "10px" }}
                                        src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(event.location)}`}
                                        allowFullScreen
                                    ></iframe>
                                ) : showMap ? (
                                    <p className="error-message">⚠️ Google Maps API Key is missing or invalid.</p>
                                ) : null}
                            </>
                        )}
                    </div>
                </div>

                {/* Booking Button */}
                <button 
                    onClick={() => navigate(`/payment?event=${id}`)} 
                    className="book-now-button"
                >
                    🎟 Book Now
                </button>
            </div>

            {/* Chat Icon */}
            <div className="chat-icon">💬</div>
        </div>
    );
};

export default EventDetails;
