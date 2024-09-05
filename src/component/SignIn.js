import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { useAuth } from './authcontext/AuthContext'; // Import useAuth

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Sign-in successful!');
        setError('');
        login(); // Call login function to update context
        navigate('/users'); // Redirect to users page on success
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid credentials');
        setSuccess('');
      }
    } catch (err) {
      setError('Network error or server is down');
      setSuccess('');
    }
  };

  return (
    <div className="signin-form-container">
      <h2>Sign In</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className='signinbtn' type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
