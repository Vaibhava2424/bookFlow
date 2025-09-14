import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css'; // Import the CSS file

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL path

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to landing page
    navigate('/LandingPage');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Name */}
        <div 
          className="brand" 
          onClick={() => navigate('/')}
        >
          Book<span className="highlight">Flow</span>
        </div>
        
        {/* Navigation Links */}
        <div className="links">
          <button 
            className="link-button" 
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button 
            className='link-button' 
            onClick={() => navigate('/about')}
          >
            About
          </button>
          
          {/* Only show "Add Book" if not on /add-Book page */}
          {location.pathname !== '/add-Book' && (
            <button 
              className="add-button" 
              onClick={() => navigate('/add-Book')}
            >
              Add Book
            </button>
          )}

          {/* Logout button */}
          <button 
            className="logout-button" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
