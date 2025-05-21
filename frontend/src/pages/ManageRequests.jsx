// frontend/src/pages/ManageRequests.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // To get token/role (though with httpOnly cookie, role check is backend)

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { role } = useContext(AuthContext); // Get role from context for display purposes

  // Function to fetch all requests
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      // Axios will automatically send the httpOnly cookie due to withCredentials: true
      const res = await axios.get('http://localhost:5000/api/requests/all');
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching requests:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to fetch requests.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle approving/rejecting a request
  const handleUpdateStatus = async (requestId, newStatus) => {
    // Optional: Ask for a reason if rejecting
    let reason = '';
    if (newStatus === 'Rejected') {
      reason = prompt('Please enter a reason for rejection:');
      if (reason === null) return; // User cancelled prompt
      if (reason.trim() === '') {
        alert('Reason for rejection cannot be empty.');
        return;
      }
    }

    try {
      await axios.put(`http://localhost:5000/api/requests/${requestId}/status`, {
        status: newStatus,
        reason: reason, // Send reason if applicable
      });
      alert(`Request ${newStatus} successfully!`);
      fetchRequests(); // Re-fetch requests to update the list
    } catch (err) {
      console.error(`Error ${newStatus} request:`, err.response?.data || err.message);
      alert(`Failed to ${newStatus} request: ${err.response?.data?.message || err.message}`);
    }
  };

  // Fetch requests on component mount
  useEffect(() => {
    if (role === 'Admin') { // Ensure only Admin attempts to fetch these
      fetchRequests();
    } else {
      setError('You are not authorized to view this page.');
      setLoading(false);
    }
  }, [role]); // Refetch if role changes (e.g., after login)

  if (loading) {
    return <div className="container mt-5">Loading requests...</div>;
  }

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Manage Software Access Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>User</th>
              <th>Software</th>
              <th>Access Level</th>
              <th>Reason</th>
              <th>Requested On</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.user?.username || 'N/A'}</td> {/* Populate user */}
                <td>{request.software?.name || 'N/A'}</td> {/* Populate software */}
                <td>{request.accessLevel}</td>
                <td>{request.reason}</td>
                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                <td>{request.status}</td>
                <td>
                  {request.status === 'Pending' && (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleUpdateStatus(request._id, 'Approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleUpdateStatus(request._id, 'Rejected')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {request.status !== 'Pending' && (
                    <span>{request.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageRequests;