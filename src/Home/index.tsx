import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import './index.css';
import Header from '../Header/index.js';
import Footer from '../Footer/index.js';
// Define the type for a single book
interface IBook {
  _id: string;
  title: string;
  authorId: string;
  genreId: string;
  pages: number;
  publishedDate: string;
  coverImageUrl: string;
}

// Mock data with reliable book cover image URLs
const mockPopularBooks: IBook[] = [
  {
    _id: "1",
    title: "Harry Potter and the Sorcerer's Stone",
    authorId: "a1",
    genreId: "g1",
    pages: 309,
    publishedDate: "1997-06-26T00:00:00.000Z",
    coverImageUrl: "https://covers.openlibrary.org/b/id/7984916-L.jpg"
  },
  {
    _id: "2",
    title: "1984",
    authorId: "a2",
    genreId: "g2",
    pages: 328,
    publishedDate: "1949-06-08T00:00:00.000Z",
    coverImageUrl: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
  },
  {
    _id: "3",
    title: "The Great Gatsby",
    authorId: "a3",
    genreId: "g3",
    pages: 180,
    publishedDate: "1925-04-10T00:00:00.000Z",
    coverImageUrl: "https://covers.openlibrary.org/b/id/153541-L.jpg"
  },
  {
    _id: "4",
    title: "To Kill a Mockingbird",
    authorId: "a4",
    genreId: "g4",
    pages: 281,
    publishedDate: "1960-07-11T00:00:00.000Z",
    coverImageUrl: "https://covers.openlibrary.org/b/id/8228691-L.jpg"
  },
  {
    _id: "5",
    title: "The Lord of the Rings",
    authorId: "a5",
    genreId: "g1",
    pages: 1178,
    publishedDate: "1954-07-29T00:00:00.000Z",
    coverImageUrl: "https://covers.openlibrary.org/b/id/8231994-L.jpg"
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [popularBooks, setPopularBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  // Use mock data instead of fetching from the backend
  useEffect(() => {
    // Simulate a network request with a delay
    const loadMockData = () => {
      setLoading(true);
      setTimeout(() => {
        setPopularBooks(mockPopularBooks);
        setLoading(false);
      }, 1000); // 1-second delay
    };
    loadMockData();
  }, []);

  const handleExplore = () => {
    navigate('/BooksPage');
  };

  if (loading) {
    return (
      <div className=" loading">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className='home-container'>
        <div className='hero-section'>
          <h1 className='home-title'>Welcome to BookFlow</h1>
          <p className='home-description'>The <span className='journey-highlight'>JOURNEY</span> of a thousand miles begins with a <span className='journey-highlight'>SINGLE PAGE</span></p>
          <div className='home-cta'>
            <button className='home-button' onClick={handleExplore}>Explore Books Now</button>
          </div>
        </div>
        <div className='hero-image-container'>
          <img src="https://res.cloudinary.com/dodfv5sbg/image/upload/v1757396415/freepik__background__4850_o9hcel.png" className="home-image" alt="Books illustration" />
        </div>
      </div>
      <div className='popular-books-section'>
        <h2 className='popular-books-title'>Popular Books</h2>
        {error ? (
          <div className="status-message error-message">{error}</div>
        ) : popularBooks.length > 0 ? (
          <div className="popular-books-grid">
            {popularBooks.map((book) => (
              <div key={book._id} className="book-card-container">
                <div className="book-card-inner">
                  {/* Front of the card (Image) */}
                  <div className="book-card-front">
                    <img src={book.coverImageUrl} alt={book.title} className="book-cover" />
                  </div>
                  {/* Back of the card (Details) */}
                  <div className="book-card-back">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-pages">Pages: {book.pages}</p>
                    <p className="book-details">Published: {new Date(book.publishedDate).getFullYear()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="status-message">No popular books found.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
