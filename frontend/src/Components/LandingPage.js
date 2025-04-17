// src/components/LandingPage.js
import React, { useContext } from "react";
import "../Styles/LandingPage.css";
import { AppContext } from "../context/AppContext";

function LandingPage() {
  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="main-title">Tickora</h1>
        <h2 className="subtitle">Discover & Book Amazing Events Effortlessly!</h2>
        <p className="description">
          Seamlessly publish, connect, and experience events with Tickora.
        </p>
        <div className="hero-buttons">
          <button
            className="recruiter-login-btn"
            onClick={() => setShowRecruiterLogin(true)}
          >
            Recruiter Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
