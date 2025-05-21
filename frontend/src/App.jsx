import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import CreateSoftware from "./pages/CreateSoftware.jsx";
import RequestAccess from "./pages/RequestAccess.jsx";
import PendingRequest from "./pages/PendingRequest.jsx";
import ManageRequests from "./pages/ManageRequests.jsx";
import MyRequests from "./pages/MyRequests.jsx"; // <<< IMPORT THE NEW COMPONENT
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Employee Routes */}
            <Route
              path="/request-access"
              element={
                <PrivateRoute allowedRoles={["Employee"]}>
                  <RequestAccess />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-requests" // <<< NEW ROUTE FOR EMPLOYEE'S OWN REQUESTS
              element={
                <PrivateRoute allowedRoles={["Employee"]}>
                  <MyRequests />
                </PrivateRoute>
              }
            />

            {/* Manager Route */}
            <Route
              path="/pending-requests"
              element={
                <PrivateRoute allowedRoles={["Manager"]}>
                  <PendingRequest />
                </PrivateRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/create-software"
              element={
                <PrivateRoute allowedRoles={["Admin"]}>
                  <CreateSoftware />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-requests"
              element={
                <PrivateRoute allowedRoles={["Admin"]}>
                  <ManageRequests />
                </PrivateRoute>
              }
            />

            {/* Catch-all Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
