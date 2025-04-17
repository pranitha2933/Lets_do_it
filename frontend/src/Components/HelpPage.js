import React from 'react';
import { useNavigate } from 'react-router-dom';

const HelpPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", lineHeight: 1.6, background: "#f9f9f9" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        ← Go Back
      </button>

      <div style={{ background: "#fff", padding: "2rem", borderRadius: "10px", boxShadow: "0 0 15px rgba(0,0,0,0.1)" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#333" }}>Help & Workflow Guide</h1>

        <p>Welcome to <strong>Tickora</strong> – your one-stop platform for managing and attending exciting events!</p>

        <h2 style={{ color: "#444", marginTop: "2rem" }}>🎯 What is Tickora?</h2>
        <p>
          Tickora is a recruiter-event management platform where organizers (recruiters) can post their events,
          and users can browse, filter, and book those events.
        </p>

        <h2 style={{ color: "#444", marginTop: "2rem" }}>🧭 Application Workflow</h2>
        <ol style={{ paddingLeft: "1.2rem" }}>
          <li><strong>Login/Signup:</strong> Recruiters log in or register to create and manage events.</li>
          <li><strong>Create Event:</strong> Recruiters fill in details like title, date, location, image, and book link.</li>
          <li><strong>Explore Events:</strong> Users browse events via category (Technical, Cultural, Sports, etc.), search bar, or cities list.</li>
          <li><strong>Book Events:</strong> Clicking “Book Now” takes users to an external booking link.</li>
          <li><strong>Event Filtering:</strong> Use the search bar or category dropdown in the Navbar to filter events.</li>
          <li><strong>Blogs & Network:</strong> Stay updated via blogs, and connect with others through network tabs.</li>
        </ol>

        <h2 style={{ color: "#444", marginTop: "2rem" }}>📌 FAQs</h2>
        <ul>
          <li><strong>Q:</strong> How can I edit an event?<br /><strong>A:</strong> Go to your dashboard and click the edit icon next to the event.</li>
          <li><strong>Q:</strong> Is login necessary to book an event?<br /><strong>A:</strong> No, users can browse and book without logging in.</li>
          <li><strong>Q:</strong> Can I delete events?<br /><strong>A:</strong> Yes, if you're logged in as a recruiter, you can delete your created events.</li>
        </ul>

        <h2 style={{ color: "#444", marginTop: "2rem" }}>📬 Need More Help?</h2>
        <p>If you have more questions, feel free to contact our support team.</p>
        <p><strong>Email:</strong> <a href="mailto:ticktarec@gmail.com">ticktarec@gmail.com</a></p>
      </div>
    </div>
  );
};

export default HelpPage;
