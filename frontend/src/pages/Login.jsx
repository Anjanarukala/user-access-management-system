// frontend/src/pages/Login.jsx
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use the login function from AuthContext

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData, {
        withCredentials: true, // Ensure this is present to send cookies
      });

      // Call the login function from AuthContext to update global state and localStorage
      // Now res.data should contain token, role, and userId
      login(res.data.token, res.data.role, res.data.userId); // <<< CRITICAL CHANGE

      // Redirect based on role
      if (res.data.role === 'Admin') navigate('/create-software');
      else if (res.data.role === 'Manager') navigate('/pending-requests');
      else navigate('/request-access');
    } catch (err) {
      console.error('Login failed:', err.response?.data || err); // More detailed error logging
      alert(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="col-md-4">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input name="username" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input name="password" type="password" className="form-control" onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;