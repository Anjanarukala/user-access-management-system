import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CreateSoftware = () => {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accessLevels, setAccessLevels] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAccessLevels([...accessLevels, value]);
    } else {
      setAccessLevels(accessLevels.filter((level) => level !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/software",
        { name, description, accessLevels },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Software created successfully!");
      setName("");
      setDescription("");
      setAccessLevels([]);
    } catch (error) {
      console.error("Error creating software:", error.response?.data || error);
      alert("Failed to create software.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Software</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Software Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Access Levels</label>
          <div className="form-check">
            <input type="checkbox" value="Read" onChange={handleCheckboxChange} className="form-check-input" />
            <label className="form-check-label">Read</label>
          </div>
          <div className="form-check">
            <input type="checkbox" value="Write" onChange={handleCheckboxChange} className="form-check-input" />
            <label className="form-check-label">Write</label>
          </div>
          <div className="form-check">
            <input type="checkbox" value="Admin" onChange={handleCheckboxChange} className="form-check-input" />
            <label className="form-check-label">Admin</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default CreateSoftware;
