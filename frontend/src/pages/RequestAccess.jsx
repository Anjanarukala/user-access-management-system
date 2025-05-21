// frontend/src/pages/RequestAccess.jsx
import React, { useState, useEffect, useContext } from "react"; // Import useContext
import axios from "axios";
// The useNavigate is not used in this component, so it can be removed if not used elsewhere
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const RequestAccess = () => {
  const [softwareList, setSoftwareList] = useState([]); // Renamed for clarity with software model
  const [form, setForm] = useState({
    softwareId: "", // Renamed to softwareId to match backend expectation
    accessLevel: "Read", // Changed from accessType to accessLevel to match backend
    reason: "",
  });
  const [message, setMessage] = useState(''); // For success/error messages

  // Get the token from AuthContext (though we won't use it directly in headers anymore)
  const { token, userId } = useContext(AuthContext); // Get userId for console logs if needed

  const fetchSoftwares = async () => {
    try {
      // Remove Authorization header - rely on withCredentials for httpOnly cookie
      const res = await axios.get("http://localhost:5000/api/software");
      setSoftwareList(res.data);
    } catch (error) {
      console.error("Error fetching software list:", error);
      setMessage("Failed to load software list. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    // CRITICAL DEBUGGING STEP HERE - REMOVE AFTER FIXING
    console.log('Frontend: Submitting Request with payload:', form);
    console.log('Frontend: Token from AuthContext (not sent in header, but for info):', token);
    // ----------------------------------------------------

    try {
      // Remove Authorization header - rely on withCredentials for httpOnly cookie
      const res = await axios.post("http://localhost:5000/api/requests", {
        softwareId: form.softwareId, // Ensure it's softwareId matching backend
        accessLevel: form.accessLevel, // Ensure it's accessLevel matching backend
        reason: form.reason,
      });
      setMessage(res.data.message);
      alert(res.data.message); // Keep alert for immediate feedback
      setForm({ softwareId: "", accessLevel: "Read", reason: "" }); // Reset form
    } catch (error) {
      console.error("Submission failed:", error.response?.data || error);
      setMessage(error.response?.data?.message || 'Failed to submit request. Please try again.');
      alert(error.response?.data?.message || 'Failed to submit request. Please try again.'); // Keep alert for immediate feedback
    }
  };

  useEffect(() => {
    // Only fetch if a token exists in AuthContext (meaning user is logged in)
    if (token) {
      fetchSoftwares();
    } else {
      setMessage("Please log in to request access to software.");
    }
  }, [token]); // Re-run effect if token changes

  return (
    <div className="container mt-4">
      <h2>Request Software Access</h2>
      {message && <div className={`alert ${message.includes('Failed') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}

      {token ? ( // Only show form if token exists
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="form-group">
            <label>Select Software</label>
            <select
              className="form-control"
              name="softwareId" // Name attribute to match form state
              value={form.softwareId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              {softwareList.map((sw) => (
                <option key={sw._id} value={sw._id}>
                  {sw.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mt-2">
            <label>Access Level</label> {/* Changed from Access Type for consistency */}
            <select
              className="form-control"
              name="accessLevel" // Name attribute to match form state
              value={form.accessLevel}
              onChange={handleChange}
              required
            >
              {/* These options should ideally come from backend software details if dynamic */}
              <option value="Read">Read</option>
              <option value="Write">Write</option>
              <option value="Execute">Execute</option> {/* Changed 'Admin' to 'Execute' as typical for software access */}
            </select>
          </div>

          <div className="form-group mt-2">
            <label>Reason</label>
            <textarea
              className="form-control"
              name="reason" // Name attribute to match form state
              value={form.reason}
              onChange={handleChange}
              required // Reason is required by your backend model, so make it required here
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit Request
          </button>
        </form>
      ) : (
        <p>Please log in to request access to software.</p>
      )}
    </div>
  );
};

export default RequestAccess;