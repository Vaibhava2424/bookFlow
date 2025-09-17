import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="landing-page-container">
        <div className="landing-content">
          <div className="landing-text">
            <h1 className="landing-title">Book<span className="highlight">Flow</span></h1>
            <p className="landing-description">
              Your personal library, simplified. Manage your books, discover new authors, and organize your reading journey all in one place.
            </p>
            <div className="landing-buttons">
              <button 
                onClick={() => navigate('/signup')} 
                className="landing-button signup-button"
              >
                Sign Up
              </button>
              <button 
                onClick={() => navigate('/signin')} 
                className="landing-button signin-button"
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="landing-image-container">
            <img
              src="https://res.cloudinary.com/dodfv5sbg/image/upload/v1757497310/6822722_hooizf.jpg"
              alt="A person reading a book in a library."
              className="landing-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
