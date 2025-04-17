// src/components/AccountDetails.js
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../Styles/AccountDetails.css";

function AccountDetails() {
  const { recruiter } = useContext(AppContext);

  if (!recruiter) {
    return <div className="account-container">No recruiter info found.</div>;
  }

  const imageUrl = recruiter.image
    ? `http://localhost:5000/uploads/${recruiter.image}`
    : null;

  return (
    <div className="account-container">
      <h2>Account Details</h2>
      <div className="profile-card">
      {imageUrl && (
          <img
            src={imageUrl}
            alt="Company Logo"
            className="company-logo"
            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
          />
        )}
        <div className="info">
          <p><strong>Company Name:</strong> {recruiter.name}</p>
          <p><strong>Email:</strong> {recruiter.email}</p>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
