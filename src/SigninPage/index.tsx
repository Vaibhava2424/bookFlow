import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import './index.css';

// Define response type for signin API
interface SigninResponse {
  token: string;
  user: {
    name: string;
    email: string;
    username: string;
  };
}

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
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
        password: formData.password.trim(),
      };

      const response = await axios.post<SigninResponse>(
        'https://bookflow-apis.onrender.com/api/v1/signin',
        trimmedData
      );

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setMessage('Signed in successfully!');

      // Navigate to home page
      setTimeout(() => navigate('/home'), 0);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const errorMessage =
        error.response?.data?.message ||
        'Invalid credentials. Please try again.';
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
            <h2 className="auth-title">Sign In</h2>
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
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
            <button type="submit" className="form-button" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <p className="auth-switch">
              Don't have an account?{' '}
              <span
                onClick={() => navigate('/signup')}
                className="switch-link"
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
