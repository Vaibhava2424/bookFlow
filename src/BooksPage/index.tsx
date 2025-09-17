import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import Header from '../Header';
import Footer from '../Footer';

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

interface IUser {
  _id?: string;
  username?: string;
  email?: string;
}

const BooksPage: React.FC = () => {
  const [booksList, setBooksList] = useState<IBook[]>([]);
  const [userBooksList, setUserBooksList] = useState<IBook[]>([]); // User added books
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [availableAuthors, setAvailableAuthors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const navigate = useNavigate();

  // ✅ Load user safely from localStorage
  const storedUser = localStorage.getItem("user");
  let user: IUser = {};
  try {
    user = storedUser ? JSON.parse(storedUser) : {};
  } catch {
    user = {};
  }

  // Fetch all books + user books
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get<IBook[]>('https://bookflow-apis.onrender.com/api/books');
        if (Array.isArray(response.data)) {
          setBooksList(response.data);
          const genres = [...new Set(response.data.map(book => book.genre))];
          const authors = [...new Set(response.data.map(book => book.author))];
          setAvailableGenres(genres);
          setAvailableAuthors(authors);
        } else {
          setBooksList([]);
        }
      } catch (err) {
        console.error("Failed to fetch books from the backend:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const getUserBooks = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔑 token from login
        if (!token) {
          console.warn("No token found, skipping user books fetch");
          return;
        }

        const response = await axios.get<IBook[]>(
          'https://bookflow-apis.onrender.com/api/user-books',
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ send token in headers
            },
          }
        );

        if (Array.isArray(response.data)) {
          setUserBooksList(response.data);
        } else {
          setUserBooksList([]);
        }
      } catch (err) {
        console.error("Failed to fetch user books:", err);
      }
    };

    getBooks();
    getUserBooks();
  }, []);

  const filteredBooks = booksList.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchInput.toLowerCase());
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(book.genre);
    const matchesAuthor = selectedAuthors.length === 0 || selectedAuthors.includes(book.author);
    return matchesSearch && matchesGenre && matchesAuthor;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const renderBooksList = () => (
    <div className="books-section-main">
      <div className="sidebar-column">
        {/* ✅ Profile Card (fixed username/email) */}
        <div className="profile-card">
          <div className="profile-avatar">
            {user.username?.charAt(0).toUpperCase() ||
              user.email?.charAt(0).toUpperCase() ||
              "U"}
          </div>
          <h2 className="profile-name">{user.username || "Guest User"}</h2>
          <p className="profile-email">{user.email || "No email available"}</p>
          <p className="profile-bio">📚 Book lover and expert manager</p>
        </div>

        <hr className="filter-divider" />

        {/* Filters Section */}
        <div className="filters-container">
          <div className="filter-group">
            <h4 className="filter-title">Genres</h4>
            {availableGenres.map((genre) => (
              <div key={genre}>
                <label>
                  <input
                    type="checkbox"
                    value={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      setSelectedGenres((prev) =>
                        checked ? [...prev, value] : prev.filter((t) => t !== value)
                      );
                    }}
                  />
                  {genre}
                </label>
              </div>
            ))}
          </div>

          <hr className="filter-divider" />

          <div className="filter-group">
            <h4 className="filter-title">Authors</h4>
            {availableAuthors.map((author) => (
              <div key={author}>
                <label>
                  <input
                    type="checkbox"
                    value={author}
                    checked={selectedAuthors.includes(author)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      setSelectedAuthors((prev) =>
                        checked ? [...prev, value] : prev.filter((t) => t !== value)
                      );
                    }}
                  />
                  {author}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="books-list-column">
        {/* Search Bar */}
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search books by title"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Main Books List */}
        <ul className="books-list">
          {currentBooks.length > 0 ? (
            currentBooks.map((book) => (
              <li key={book._id}>
                <Link to={`/books/${book._id}`} className="book-card-container">
                  <div className="book-card-inner">
                    <div className="book-card-front">
                      <img src={book.image} alt={book.title} className="book-image" />
                      <div className="button-container-mobile">
                        <button
                          onClick={() => navigate(`/books/${book._id}`)}
                          className="view-details-button"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    <div className="book-card-back">
                      <h3 className="book-card-title">{book.title}</h3>
                      <p className="book-card-author">Author: {book.author}</p>
                      <p className="book-card-genre">Genre: {book.genre}</p>
                      <div className="button-container">
                        <button
                          onClick={() => navigate(`/books/${book._id}`)}
                          className="view-details-button"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <div className="no-books-found">No books found.</div>
          )}
        </ul>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        )}

        {/* User Added Books Section */}
        {userBooksList.length > 0 && (
          <div className="user-books-section">
            <h2 className="user-books-title">User Added Books</h2>
            <ul className="books-list">
              {userBooksList.map((book) => (
                <li key={book._id}>
                  <Link to={`/user-books/${book._id}`} className="book-card-container">
                    <div className="book-card-inner">
                      <div className="book-card-front">
                        <img src={book.image} alt={book.title} className="book-image" />
                      </div>
                      <div className="book-card-back">
                        <h3 className="book-card-title">{book.title}</h3>
                        <p className="book-card-author">Author: {book.author}</p>
                        <p className="book-card-genre">Genre: {book.genre}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        
      </div>
    </div>
  );

  return isLoading ? (
    <div className="loading-container">Loading Books...</div>
  ) : (
    <>
      <Header />
      {renderBooksList()}
      <Footer />
    </>
  );
};

export default BooksPage;
