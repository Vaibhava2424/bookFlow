import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/index.js';
import Footer from '../Footer/index.js';
import './index.css';

// Define the type for your simplified book model
interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  image: string;
  description: string;
  publishedDate: string;
}

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<IBook | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) {
        setError("Invalid book ID.");
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get<IBook>(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);
      } catch (err) {
        setError("Failed to fetch book details. Please check the ID.");
        console.error("Error fetching book details:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (isLoading) {
    return (
      <div className="book-details-page loading">
        <Header />
        <div className="loading-message">Loading book details...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-details-page error">
        <Header />
        <div className="error-message">{error}</div>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-details-page not-found">
        <Header />
        <div className="not-found-message">Book not found.</div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="book-details-page">
        <div className="details-container">
          {/* Left side: Book Cover Image */}
          <div className="image-column">
            <img src={book.image} alt={book.title} className="book-cover-image" />
            <button 
              onClick={() => navigate(-1)} 
              className="back-button"
            >
              Back to Books
            </button>
          </div>

          {/* Right side: Detailed Information */}
          <div className="details-column">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-detail"><strong>Author:</strong> {book.author}</p>
            <p className="book-detail"><strong>Genre:</strong> {book.genre}</p>
            <p className="book-detail"><strong>Published Date:</strong> {new Date(book.publishedDate).toLocaleDateString()}</p>
            <p className="book-detail"><strong>Description:</strong> {book.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookDetailsPage;
