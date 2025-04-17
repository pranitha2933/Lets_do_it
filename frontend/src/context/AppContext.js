import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [isRecruiterLoggedIn, setIsRecruiterLoggedIn] = useState(false);
  const [recruiter, setRecruiter] = useState(null);

  useEffect(() => {
    const storedRecruiter = localStorage.getItem("recruiter");
    if (storedRecruiter) {
      setRecruiter(JSON.parse(storedRecruiter));
      setIsRecruiterLoggedIn(true);
    }
  }, []);


  const loginRecruiter = (data) => {
    localStorage.setItem("recruiter", JSON.stringify(data));
    setRecruiter(data);
    setIsRecruiterLoggedIn(true);
  };

  const logoutRecruiter = () => {
    localStorage.removeItem("recruiter");
    setRecruiter(null);
    setIsRecruiterLoggedIn(false);
  };

  return (
    <AppContext.Provider
      value={{
        showRecruiterLogin,
        setShowRecruiterLogin,
        isRecruiterLoggedIn,
        setIsRecruiterLoggedIn,
        recruiter,
        setRecruiter,
        loginRecruiter,
        logoutRecruiter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
