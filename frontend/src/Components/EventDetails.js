import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Styles/EventDetails.css";

// 🔧 Helper to convert any Google Maps link into embeddable format
const getEmbedMapUrl = (originalMapLink) => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    if (!originalMapLink || !apiKey) return null;

    try {
        const url = new URL(originalMapLink);
        if (url.pathname.includes("/dir/")) {
            const parts = url.pathname.split("/dir/")[1].split("/");
            const origin = encodeURIComponent(parts[0]);
            const destination = encodeURIComponent(parts[1]);

            return `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}`;
        }

        if (url.pathname.includes("/place/")) {
            const place = url.pathname.split("/place/")[1].split("/")[0];
            return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(place)}`;
        }

        return null;
    } catch (e) {
        return null;
    }
};

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showBookingLink, setShowBookingLink] = useState(false);

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

    const embedMapUrl = getEmbedMapUrl(event.maplink);

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

                        {/* Embed Map Section */}
                        {event.maplink && embedMapUrl && (
                            <>
                                <button className="map-link" onClick={() => setShowMap(!showMap)}>
                                    {showMap ? "Hide Map ▲" : "Show Map ▼"}
                                </button>
                                {showMap && (
                                    <iframe
                                        title="Event Map"
                                        width="100%"
                                        height="300"
                                        frameBorder="0"
                                        style={{ borderRadius: "10px", marginTop: "10px" }}
                                        src={embedMapUrl}
                                        allowFullScreen
                                        loading="lazy"
                                    ></iframe>
                                )}
                            </>
                        )}

                        {/* Fallback for non-convertible map links */}
                        {event.maplink && !embedMapUrl && (
                            <p className="error-message">
                                ⚠️ Map link is not embeddable. Please use a valid Google Maps link with directions or place.
                            </p>
                        )}
                    </div>
                </div>

                {/* Book Now Button */}
                <button
                    onClick={() => setShowBookingLink(true)}
                    className="book-now-button"
                >
                    🎟 Book Now
                </button>

                {/* Render Booking Link */}
                {showBookingLink && event.booklink && (
                    <div className="booking-link-container">
                        <p>👉 Click below to complete your booking:</p>
                        <a
                            href={event.booklink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="booking-link-button"
                        >
                            Go to Booking Page 🔗
                        </a>
                    </div>
                )}

                {showBookingLink && !event.booklink && (
                    <p className="error-message">⚠️ Booking link not available for this event.</p>
                )}
            </div>

            {/* Chat Icon */}
            <div className="chat-icon">💬</div>
        </div>
    );
};

export default EventDetails;
