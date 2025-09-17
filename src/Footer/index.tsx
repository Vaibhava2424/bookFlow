import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import './index.css'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Book<span className="highlight">Flow</span></h2>

        <p className="footer-description">
          Dive into a world of stories! Discover, explore, and manage your favorite books all in one place with BookFlow.
        </p>

        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://www.linkedin.com/in/vaibhava-raju-nadakuditi" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          <a href="https://www.instagram.com/vaibhava.raj" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>

        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>

        <p className="footer-copy">© 2025 Jobby. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
