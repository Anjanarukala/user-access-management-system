import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * Protects a route from unauthorized access.
 * @param {JSX.Element} children - The component to render if authenticated.
 * @param {string[]} allowedRoles - Optional array of roles allowed to access the route.
 */
const PrivateRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(AuthContext);

  if (!token) {
    // User not logged in
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // User doesn't have permission
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
