// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null); // Ensure userId state is here

  // Persist auth on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUserId = localStorage.getItem("userId"); // Retrieve userId from localStorage

    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);
    if (storedUserId) setUserId(storedUserId); // Set userId state
  }, []);

  // Update this login function to accept and store userId
  const login = (newToken, newRole, newUserId) => {
    setToken(newToken);
    setRole(newRole);
    setUserId(newUserId); // Store userId in state
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    localStorage.setItem("userId", newUserId); // Store userId in localStorage
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUserId(null); // Clear userId from state
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId"); // Clear userId from localStorage
  };

  return (
    <AuthContext.Provider value={{ token, role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};