import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/EventForm.css";

const EventForm = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    country: "",
    date: "",
    price: "",
    time: "",
    category: "",
    image: null,
    booklink: "",
    maplink: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("price", eventData.price);
    formData.append("time", eventData.time);
    formData.append("location", eventData.location);
    formData.append("country", eventData.country);
    formData.append("category", eventData.category);
    if (eventData.image) {
      formData.append("image", eventData.image);
    }
    formData.append("booklink", eventData.booklink);
    formData.append("maplink", eventData.maplink);
    try {
      await axios.post("http://localhost:5000/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Event Created Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("❌ Failed to create event!");
    }
  };

  return (
    <>
    <div className="event-form-container">
      <br /><br />
      <h2 className="form-title">Create Your Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <input type="text" name="title" placeholder="Event Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Event Description" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Event Location" onChange={handleChange} required />
        <input type="text" name="country" placeholder="Event Country" onChange={handleChange} required />
        <input type="text" name="date" placeholder="Event Date" onChange={handleChange} required />
        <input type="text" name="time" placeholder="Event Time" onChange={handleChange} required />
        <input type="text" name="category" placeholder="Event Category" onChange={handleChange} required />
        <input type="text" name="price" placeholder="Event Price" onChange={handleChange} required />
        <input type="file" name="image" onChange={handleFileChange} required />
        <input type="text" name="booklink" placeholder="Event Booking Link" onChange={handleChange} required />
        <input type="text" name="maplink" placeholder="Event map Link" onChange={handleChange} required />
        <button type="submit" className="submit-button">Create Event</button>
      </form>
    </div>
    <br /><br /><br />

    <div className="chat-icon">💬</div>
    </>
  );
};

export default EventForm;
