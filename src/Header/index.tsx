import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/LandingPage");
    setMenuOpen(false);
  };

  const handleLinkClick = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <div className="brand" onClick={() => handleLinkClick("/home")}>
          Book<span className="highlight">Flow</span>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger-menu ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div />
          <div />
          <div />
        </button>

        {/* Desktop Links */}
        <div className="links">
          <button
            className={`link-button ${isActive("/home") ? "active" : ""}`}
            onClick={() => handleLinkClick("/home")}
          >
            Home
          </button>
          <button
            className={`link-button ${isActive("/BooksPage") ? "active" : ""}`}
            onClick={() => handleLinkClick("/BooksPage")}
          >
            Books
          </button>
          <button
            className={`link-button ${isActive("/about") ? "active" : ""}`}
            onClick={() => handleLinkClick("/about")}
          >
            About
          </button>
          {location.pathname !== "/add-book" && (
            <button
              className={`add-button ${isActive("/add-book") ? "active" : ""}`}
              onClick={() => handleLinkClick("/add-book")}
            >
              Add Book
            </button>
          )}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Mobile Menu (Slide-in small panel) */}
        <div className={`links-mobile ${menuOpen ? "open" : ""}`}>
          <button
            className={`link-button ${isActive("/home") ? "active" : ""}`}
            onClick={() => handleLinkClick("/home")}
          >
            Home
          </button>
          <button
            className={`link-button ${isActive("/BooksPage") ? "active" : ""}`}
            onClick={() => handleLinkClick("/BooksPage")}
          >
            Books
          </button>
          <button
            className={`link-button ${isActive("/about") ? "active" : ""}`}
            onClick={() => handleLinkClick("/about")}
          >
            About
          </button>
          {location.pathname !== "/add-book" && (
            <button
              className={`add-button ${isActive("/add-book") ? "active" : ""}`}
              onClick={() => handleLinkClick("/add-book")}
            >
              Add Book
            </button>
          )}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
