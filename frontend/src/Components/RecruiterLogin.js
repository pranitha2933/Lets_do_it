// src/components/RecruiterLogin.js
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import "../Styles/RecruiterLogin.css";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login"); // "Login" or "Sign Up"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const {
    setRecruiter,
    setIsRecruiterLoggedIn,
    setShowRecruiterLogin
  } = useContext(AppContext);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmited) {
      setIsTextDataSubmited(true); // Proceed to image upload screen
      return;
    }

    try {
      let response;

      if (state === "Login") {
        // 🔐 Login with email/password
        response = await fetch("http://localhost:5000/api/recruiter/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
      } else {
        // 📝 Sign up with name, email, password, image
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if (image) formData.append("image", image);

        response = await fetch("http://localhost:5000/api/recruiter/signup", {
          method: "POST",
          body: formData,
        });
      }

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      // ✅ Save user & update context
      localStorage.setItem("recruiter", JSON.stringify(data.recruiter || data));
      setRecruiter(data.recruiter || data);
      setIsRecruiterLoggedIn(true);
      setShowRecruiterLogin(false);
      navigate("/");

    } catch (err) {
      console.error("Error:", err);
      alert("Server error. Try again later.");
    }
  };

  useEffect(() => {
    // Prevent background scrolling
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="modal-container">
      <form onSubmit={onSubmitHandler} className="form-container">
        <h1 className="form-title">Recruiter {state}</h1>
        <p className="form-subtitle">Welcome! Please {state === "Login" ? "sign in" : "register"} to continue</p>

        {/* STEP 1: Form fields */}
        {(state === "Login" || !isTextDataSubmited) && (
          <>
            {state !== "Login" && (
              <div className="input-container">
                <img src={assets.person_icon} alt="name" />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Company Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="input-container">
              <img src={assets.email_icon} alt="email" />
              <input
                className="input-field"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <img src={assets.lock_icon} alt="password" />
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {/* STEP 2: Image upload for signup */}
        {state === "Sign Up" && isTextDataSubmited && (
          <div className="upload-container">
            <label htmlFor="image">
              <img
                className="upload-image"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload"
              />
              <input
                id="image"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <p>Upload Company <br /> Logo</p>
          </div>
        )}

        {/* Forgot password (login only) */}
        {state === "Login" && (
          <p className="forgot-password">Forget password?</p>
        )}

        {/* Submit button */}
        <button type="submit" className="submit-button">
          {state === "Login"
            ? "Login"
            : isTextDataSubmited
            ? "Create Account"
            : "Next"}
        </button>

        {/* Toggle between login & signup */}
        {state === "Login" ? (
          <p className="switch-text">
            Don’t have an account?{" "}
            <span
              className="switch-link"
              onClick={() => {
                setState("Sign Up");
                setIsTextDataSubmited(false);
              }}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="switch-text">
            Already have an account?{" "}
            <span
              className="switch-link"
              onClick={() => {
                setState("Login");
                setIsTextDataSubmited(false);
              }}
            >
              Login
            </span>
          </p>
        )}

        {/* Close modal */}
        <img
          src={assets.cross_icon}
          alt="close"
          className="close-icon"
          onClick={() => setShowRecruiterLogin(false)}
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;
