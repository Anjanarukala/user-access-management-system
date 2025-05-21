import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingRequest = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests", {
        withCredentials: true,
      });
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests", error);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/requests/${id}`,
        { status: action },
        { withCredentials: true }
      );
      fetchRequests(); // refresh
    } catch (error) {
      console.error(`Failed to ${action} request`, error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Pending Access Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="thead-dark">
            <tr>
              <th>User</th>
              <th>Software</th>
              <th>Access Type</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.user?.username}</td>
                <td>{req.software?.name}</td>
                <td>{req.accessType}</td>
                <td>{req.reason}</td>
                <td>{req.status}</td>
                <td>
                  {req.status === "Pending" ? (
                    <>
                      <button
                        className="btn btn-success btn-sm mr-2"
                        onClick={() => handleAction(req._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleAction(req._id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    req.status
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

export default PendingRequest;
