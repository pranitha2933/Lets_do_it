import React, { useState, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import EventForm from "./Components/EventForm";
import EventList from "./Components/EventList";
import EventDetails from "./Components/EventDetails";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import LandingPage from "./Components/LandingPage";
import Footer from "./Components/Footer";
import RecruiterLogin from "./Components/RecruiterLogin";
import { AppContext } from "./context/AppContext";
import HelpPage from "./Components/HelpPage";
import AccountDetails from "./Components/AccountDetails";

// ProtectedRoute HOC
const ProtectedRoute = ({ children }) => {
  const { isRecruiterLoggedIn } = useContext(AppContext);
  return isRecruiterLoggedIn ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar
        setSelectedCategory={setSelectedCategory}
        setSearchQuery={setSearchQuery}
      />

      {/* Show HeroSection only on homepage */}
      {location.pathname === "/" && <HeroSection />}

      <Routes>
        <Route
          path="/"
          element={
            <EventList
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <EventForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event/:id"
          element={
            <ProtectedRoute>
              <EventDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/help"
          element={
            <ProtectedRoute>
              <HelpPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountDetails />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

function App() {
  const {
    showRecruiterLogin,
    isRecruiterLoggedIn,
    setRecruiter,
    setIsRecruiterLoggedIn,
  } = useContext(AppContext);

  // Persist login state on refresh
  useEffect(() => {
    const storedRecruiter = localStorage.getItem("recruiter");
    if (storedRecruiter) {
      setRecruiter(JSON.parse(storedRecruiter));
      setIsRecruiterLoggedIn(true);
    }
  }, [setRecruiter, setIsRecruiterLoggedIn]);

  useEffect(() => {
    console.log("Login status:", isRecruiterLoggedIn);
  }, [isRecruiterLoggedIn]);

  return (
    <Router>
      {/* Show RecruiterLogin modal if requested */}
      {showRecruiterLogin && !isRecruiterLoggedIn && <RecruiterLogin />}

      {/* Show LandingPage if not logged in, else full app */}
      {!isRecruiterLoggedIn ? <LandingPage /> : <AppContent />}
    </Router>
  );
}

export default App;
