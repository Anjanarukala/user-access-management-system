import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert('Signup successful! You can now login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="col-md-4">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input name="username" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input name="password" type="password" className="form-control" onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
