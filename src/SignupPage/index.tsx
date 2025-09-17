import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './index.css';

// --- TypeScript interface for backend response ---
interface SignupResponse {
  token?: string;
  message: string;
  result?: {
    username: string;
    email: string;
    _id: string;
    __v?: number;
  };
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // --- Use the interface here ---
      const response = await axios.post<SignupResponse>(
        'https://bookflow-apis.onrender.com/api/v1/signup',
        formData
      );
      const data = response.data;

      if (data.token && data.result) {
        // Save token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.result));

        // Show success message briefly
        setMessage('Signup successful! Redirecting...');
        setTimeout(() => navigate('/home'), 0);
      } else {
        setMessage(data.message || 'Signup failed.');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || 'Network error.');
      } else {
        setMessage('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-title">Sign Up</h2>
          {message && <p className="form-message">{message}</p>}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />

          <button type="submit" className="form-button" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>

          <p className="auth-switch">
            Already have an account?{' '}
            <span onClick={() => navigate('/signin')} className="switch-link">
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
