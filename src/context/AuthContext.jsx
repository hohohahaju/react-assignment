import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

function isSessionValid() {
  const expiry = localStorage.getItem("userTokenExpiry");
  if (!expiry) return false;
  return Date.now() < parseInt(expiry, 10);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    if (isSessionValid()) return localStorage.getItem("userToken") || null;
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userTokenExpiry");
    return null;
  });

  const [userEmail, setUserEmail] = useState(() => {
    if (isSessionValid()) return localStorage.getItem("userEmail") || null;
    return null;
  });

  // logout is defined first so it can be safely listed in the useEffect dependency array below
  const logout = useCallback(() => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userTokenExpiry");
  }, []);

  // Auto-logout when the token expires, even while the tab is open.
  // logout is stable (wrapped in useCallback) so including it here is safe.
  useEffect(() => {
    if (!token) return;

    const expiry = parseInt(localStorage.getItem("userTokenExpiry"), 10);
    const msUntilExpiry = expiry - Date.now();

    if (msUntilExpiry <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => {
      logout();
    }, msUntilExpiry);

    return () => clearTimeout(timer);
  }, [token, logout]); // ✅ logout is now correctly listed as a dependency

  const login = (userToken, email) => {
    const expiry = Date.now() + TOKEN_EXPIRY_MS;
    setToken(userToken);
    setUserEmail(email);
    localStorage.setItem("userToken", userToken);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userTokenExpiry", expiry.toString());
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