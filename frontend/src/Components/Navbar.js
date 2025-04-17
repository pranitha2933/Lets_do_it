import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import { FaBold, FaSearch } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import HelpPage from './HelpPage';
import AccountDetails from "./AccountDetails";

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

    const { showRecruiterLogin, setShowRecruiterLogin, recruiter,  logoutRecruiter, isRecruiterLoggedIn} = useContext(AppContext);
    
    const eventCategories = ["Technical", "Sports", "Cultural", "Techno-Cultural"];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setEventsOpen(false);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setSearchQuery(e.target.value);
    };
    const handleLogout = () => {
        logoutRecruiter();
        setShowRecruiterLogin(true);
        navigate("/login");
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

    const getInitial = (email) => {
        if (!email || typeof email !== "string") return "?";
        return email.charAt(0).toUpperCase();
    };


    return (
        <div>
            <nav className="navbar">
            <div className="logo" onClick={() => navigate("/")}>
  <span className="full-logo">TICKORA</span>
  <span className="short-logo">T</span>
</div>


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

                    <button className="add-btn" onClick={() => navigate("/create-event")}>
                        +Add
                    </button>
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
                        <div className="profile" onClick={() => setMenuOpen(!menuOpen)}>
                            {getInitial(recruiter?.email)}
                        </div>
                        {menuOpen && (
                            <div className="dropdown">
                                <div className="dropdown-item" onClick={() => navigate("/account")}>Account Details</div>
                                <div className="dropdown-item" onClick={() => navigate("/settings")}>Settings</div>
                                <div className="dropdown-item" onClick={() => navigate("/help")}>Help</div>
                                <div className="dropdown-item" onClick={handleLogout} >Logout</div>
                            </div>
                        )}
                    </div> 
                </div>

                
            </nav>

            <div className="nav-links-bar">
                <div className="dropdown-container">
                    <span
                        className="nav-link"
                        onClick={() => setEventsOpen(!eventsOpen)}
                    >
                        Events
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

                <span className="nav-link-separator">|</span>
                <span className="nav-link" onClick={() => navigate("/blogs")}>
                    Blogs
                </span>
                <span className="nav-link-separator">|</span>
                <span className="nav-link">Network</span>
                <span className="nav-link-separator">|</span>
                <span className="nav-link">Exclusive</span>
                <span className="nav-link-separator">|</span>
                <span className="nav-link">Live</span>
            </div>

            <div className="city-scroll-bar">
                <span className="city-link">New Delhi</span>
                <span className="city-link">Mumbai</span>
                <span className="city-link">Kolkata</span>
                <span className="city-link">Chennai</span>
                <span className="city-link">Bengaluru</span>
                <span className="city-link">Hyderabad</span>
                <span className="city-link">Ahmedabad</span>
                <span className="city-link">Jaipur</span>
                <span className="city-link">Lucknow</span>
                <span className="city-link">Varanasi</span>
                <span className="city-link">Agra</span>
                <span className="city-link">Amritsar</span>
                <span className="city-link">Pune</span>
                <span className="city-link">Surat</span>
                <span className="city-link">Vadodara</span>
                <span className="city-link">Indore</span>
                <span className="city-link">Chandigarh</span>
                <span className="city-link">Dehradun</span>
                <span className="city-link">Ludhiana</span>
                <span className="city-link">Jodhpur</span>
                <span className="city-link">Kanpur</span>
                <span className="city-link">Nashik</span>
                <span className="city-link">Thane</span>
                <span className="city-link">Nagpur</span>
                <span className="city-link">Udaipur</span>
                <span className="city-link">Bhopal</span>
                <span className="city-link">Kochi</span>
                <span className="city-link">Visakhapatnam</span>
                <span className="city-link">Coimbatore</span>
                <span className="city-link">Madurai</span>
                <span className="city-link">Vijayawada</span>
                <span className="city-link">Patna</span>
                <span className="city-link">Bhubaneswar</span>
                <span className="city-link">Guwahati</span>
                <span className="city-link">Ranchi</span>
                <span className="city-link">Siliguri</span>
            </div>

        </div>
    );
}

export default Navbar;