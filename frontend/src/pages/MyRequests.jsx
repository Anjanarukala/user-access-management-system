// frontend/src/pages/MyRequests.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx'; // Added .jsx extension

const MyRequests = () => {
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, userId } = useContext(AuthContext); // Get token and userId from context

  const fetchMyRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      // Axios will automatically send the httpOnly cookie due to withCredentials: true
      const res = await axios.get('http://localhost:5000/api/requests/my');
      setMyRequests(res.data);
      console.log("Frontend: Fetched my requests:", res.data);
    } catch (err) {
      console.error('Frontend: Error fetching my requests:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to fetch your requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && userId) { // Only fetch if user is logged in
      fetchMyRequests();
    } else {
      setLoading(false);
      setError('Please log in to view your requests.');
    }
  }, [token, userId]); // Re-fetch if token or userId changes

  if (loading) {
    return <div className="container mt-5">Loading your requests...</div>;
  }

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>My Software Access Requests</h2>
      {myRequests.length === 0 ? (
        <p>You have not submitted any software access requests yet.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Software</th>
              <th>Access Level</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Requested On</th>
              <th>Response On</th>
              <th>Approver</th>
            </tr>
          </thead>
          <tbody>
            {myRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.software?.name || 'N/A'}</td>
                <td>{request.accessLevel}</td>
                <td>{request.reason}</td>
                <td>{request.status}</td>
                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                <td>{request.responseDate ? new Date(request.responseDate).toLocaleDateString() : 'N/A'}</td>
                <td>{request.approver?.username || 'N/A'}</td> {/* Assuming approver is populated */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyRequests;
