import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import './index.css';

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
      // Trim inputs before sending
      const trimmedData = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
      };

      const response = await axios.post(
        'http://localhost:5000/api/v1/signup',
        trimmedData
      );

      // Show backend message (optional)
      setMessage(response.data.message);

      // ✅ Redirect to home immediately after signup
      navigate('/');
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message || 'Failed to sign up. Please try again.';
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              <span
                onClick={() => navigate('/signin')}
                className="switch-link"
              >
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
