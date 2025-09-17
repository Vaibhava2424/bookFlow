import React from 'react';
import './index.css'; // Import the CSS file

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {currentYear} BookFlow. All rights reserved.
        </p>
        <p className="footer-description">
          A Prudent Assignment project for efficient book management.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
