import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { token, role } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Welcome to the User Access Management System</h1>

      {!token && (
        <>
          <p>Please login or sign up to continue.</p>
          <Link to="/login" className="btn btn-primary me-2">Login</Link>
          <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
        </>
      )}

      {token && (
        <>
          <p>You are logged in as <strong>{role}</strong>.</p>

          {role === "Employee" && (
            <Link to="/request-access" className="btn btn-success">
              Request Software Access
            </Link>
          )}

          {role === "Manager" && (
            <Link to="/pending-requests" className="btn btn-warning">
              View Pending Requests
            </Link>
          )}

          {role === "Admin" && (
            <Link to="/create-software" className="btn btn-info">
              Create New Software
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
