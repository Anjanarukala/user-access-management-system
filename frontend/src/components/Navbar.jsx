// frontend/src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token, role, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    // No need to navigate here, as PrivateRoute will redirect to login if token is null
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        🧭 Access Manager
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {!token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
            </>
          )}

          {token && role === "Employee" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/request-access">Request Access</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-requests">My Requests</Link> {/* <<< NEW EMPLOYEE LINK */}
              </li>
            </>
          )}

          {token && role === "Manager" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/pending-requests">Pending Requests</Link>
              </li>
            </>
          )}

          {token && role === "Admin" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/create-software">Create Software</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-requests">Manage Requests</Link>
              </li>
            </>
          )}

          {token && (
            <li className="nav-item">
              <button className="btn btn-outline-light ms-3" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
