import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import { FaSearch } from "react-icons/fa";

function Navbar({ setSelectedCategory, setSearchQuery }) {
    const navigate = useNavigate();
    const [eventsOpen, setEventsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFlag, setSelectedFlag] = useState({
        emoji: "🇮🇳",
        name: "India",
        code: "in",
      });


    const eventCategories = ["Technical", "Sports", "Cultural", "Techno-Cultural"];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setEventsOpen(false);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setSearchQuery(e.target.value);
    };

    const handleFlagChange = (event) => {
        const selected = flags.find((flag) => flag.emoji === event.target.value);
        if (selected) setSelectedFlag(selected);
      };

    const flags = [
        { emoji: "🇮🇳", name: "India", code: "in" },
        { emoji: "🇺🇸", name: "United States", code: "us" },
        { emoji: "🇬🇧", name: "United Kingdom", code: "gb" },
        { emoji: "🇨🇦", name: "Canada", code: "ca" },
        { emoji: "🇦🇺", name: "Australia", code: "au" },
        { emoji: "🇫🇷", name: "France", code: "fr" },
        { emoji: "🇩🇪", name: "Germany", code: "de" },
        { emoji: "🇯🇵", name: "Japan", code: "jp" },
      ];
    
    
    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate("/")}>TICKORA</div>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search events by title or location..."
                    className="search-bar"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button className="search-icon-btn">
                    <FaSearch className="search-icon" />
                </button>
            </div>


            <div className="nav-links">
                <div className="dropdown-container">
                    <span className="nav-item" onClick={() => setEventsOpen(!eventsOpen)}>
                        Events ▼
                    </span>
                    {eventsOpen && (
                        <div className="events-dropdown">
                            {eventCategories.map((category, index) => (
                                <div
                                    key={index}
                                    className="event-item"
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    {category}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <span className="nav-item" onClick={() => navigate("/blogs")}>Blogs</span>
                <button className="add-btn" onClick={() => navigate("/create-event")}>+Add</button>
                <div className="flag-container">
          <img
            src={`https://flagcdn.com/w40/${selectedFlag.code}.png`}
            alt={selectedFlag.name}
            className="flag-image"
          />
          <select className="flag-selector" onChange={handleFlagChange}>
            {flags.map((flag, index) => (
              <option key={index} value={flag.emoji}>
                {flag.emoji} {flag.name}
              </option>
            ))}
          </select>
        </div>

                <div className="user-menu">
                    <div className="profile" onClick={() => setMenuOpen(!menuOpen)}>sai</div>
                    {menuOpen && (
                        <div className="dropdown">
                            <div className="dropdown-item">Account Details</div>
                            <div className="dropdown-item">Settings</div>
                            <div className="dropdown-item">Help</div>
                            <div className="dropdown-item">Logout</div>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
