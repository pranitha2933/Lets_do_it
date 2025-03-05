import React from "react";
import "../Styles/Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Eventify</h2>
          <p>Bringing Events to Life!</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/create-event">Create Event</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: support@eventify.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Location: New York, USA</p>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" className="icon">🌍</a>
            <a href="#" className="icon">📘</a>
            <a href="#" className="icon">📷</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Eventify. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
