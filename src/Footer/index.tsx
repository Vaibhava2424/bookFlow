import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo + Short Description */}
        <div className="footer-section footer-logo" onClick={handleLogoClick}>
          <h3>Book<span className="footer-highlight">Flow</span></h3>
          <p className="footer-tagline">
            BookFlow — manage, explore, and track your books seamlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/about")}>About</li>
            <li onClick={() => navigate("/books")}>Books</li>
            <li onClick={() => navigate("/contact")}>Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="footer-title">Contact</h4>
          <p>Email: support@bookflow.com</p>
          <p>📍 Location: Virtual Library</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {currentYear} <span className="footer-highlight">BookFlow</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
