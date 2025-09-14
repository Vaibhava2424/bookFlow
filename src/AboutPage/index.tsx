import React from 'react';
import Header from '../Header/index.js';
import Footer from '../Footer/index.js';
import './index.css';

const About: React.FC = () => {
  return (
    <>
      <Header />
      <div className="about-page-container">
        <div className="about-content">
          <h1 className="about-title">About BookFlow</h1>
          <p className="about-subtitle">
            Your personal hub for managing and discovering literary treasures.
          </p>

          <section className="about-section">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              BookFlow is a MERN stack application designed to simplify the management of book records. Our mission is to provide an intuitive and efficient platform for users to search, view, and organize their favorite books. Whether you're a casual reader or a dedicated librarian, BookFlow helps you keep your literary world in order.
            </p>
          </section>

          <section className="about-section">
            <h2 className="section-title">Core Features</h2>
            <ul className="features-list">
              <li>
                <strong>Comprehensive Search:</strong> Easily find books by title, author, or genre with our powerful filtering system.
              </li>
              <li>
                <strong>Detailed Book Views:</strong> View essential information for each book, including title, author, genre, published date, and a brief description.
              </li>
              <li>
                <strong>Full CRUD Functionality:</strong> As a user, you have complete control to create, retrieve, update, and delete book records from the database.
              </li>
              <li>
                <strong>Responsive Design:</strong> Our application is built to provide a seamless experience on any device, from desktop to mobile.
              </li>
            </ul>
          </section>

          <section className="about-section">
            <h2 className="section-title">Technology Stack</h2>
            <div className="tech-stack">
              <div className="tech-item">
                <h3 className="tech-heading">Frontend</h3>
                <p className="tech-text">
                  Built with <strong>React.js</strong> and <strong>TypeScript</strong> for a robust and type-safe user interface. We use <strong>react-router-dom</strong> for efficient navigation and <strong>Axios</strong> for seamless communication with the backend API.
                </p>
              </div>
              <div className="tech-item">
                <h3 className="tech-heading">Backend</h3>
                <p className="tech-text">
                  A powerful RESTful API developed with <strong>Node.js</strong> and <strong>Express.js</strong>. It handles all data logic and security, including user authentication with <strong>Zod</strong> for validation and <strong>Bcrypt</strong> for password hashing.
                </p>
              </div>
              <div className="tech-item">
                <h3 className="tech-heading">Database</h3>
                <p className="tech-text">
                  Our data is stored in a <strong>MongoDB</strong> database, using <strong>Mongoose</strong> for object data modeling. This provides a flexible and scalable foundation for all your book records.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
