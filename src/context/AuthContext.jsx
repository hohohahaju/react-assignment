import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Check browser storage on initial load so user stays logged in on page refresh!
  const [token, setToken] = useState(() => localStorage.getItem("userToken") || null);
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail") || null);

  const login = (userToken, email) => {
    setToken(userToken);
    setUserEmail(email);
    localStorage.setItem("userToken", userToken);
    localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, userEmail, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}