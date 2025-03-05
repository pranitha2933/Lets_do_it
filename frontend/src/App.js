import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventForm from "./Components/EventForm";
import EventList from "./Components/EventList";
import EventDetails from "./Components/EventDetails";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import Footer from "./Components/Footer";
import Payment from "./Components/Payment";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
    
      <Navbar setSelectedCategory={setSelectedCategory} setSearchQuery={setSearchQuery} />
      
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            {/* ✅ Pass searchQuery to EventList */}
            <EventList selectedCategory={selectedCategory} searchQuery={searchQuery} />
          </>
        } />
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
