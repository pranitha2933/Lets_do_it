import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/HeroSection.css";

function HeroSection() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((response) => {
        console.log("Fetched Events for Hero:", response.data);
        setEvents(response.data.slice(0, 3)); // ✅ Only show first 3 events
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const scroll = (direction) => {
    if (events.length > 0) {
      setCurrentIndex((prevIndex) =>
        direction === "left"
          ? (prevIndex - 1 + events.length) % events.length // Loop back to last image
          : (prevIndex + 1) % events.length // Loop back to first image
      );
    }
  };

  return (
    <div className="hero-section">
      <button className="scroll-btn left-btn" onClick={() => scroll("left")}>
        ❮
      </button>

      <div className="hero-container">
        {events.length > 0 ? (
          <img
            key={events[currentIndex]._id}
            src={`http://localhost:5000/${events[currentIndex].image.replace(/\\/g, "/")}`} 
            alt={events[currentIndex].title}
            className="hero-image"
            onClick={() => navigate(`/event/${events[currentIndex]._id}`)}
          />
        ) : (
          <p className="loading-text">Loading events...</p>
        )}
      </div>

      <button className="scroll-btn right-btn" onClick={() => scroll("right")}>
        ❯
      </button>
    </div>
  );
}

export default HeroSection;
