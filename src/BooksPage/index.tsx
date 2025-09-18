import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Header from '../Header';
import Footer from '../Footer';
import BookCard from '../BookCard';
import BookCardSkeleton from '../BookCardSkeleton';

interface IUser {
  _id?: string;
  username?: string;
  email?: string;
}

interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description?: string;
  image?: string; // optional because API might not provide it
  [key: string]: unknown;
}

const DEFAULT_BOOK_IMAGE = '/default-book.png'; // put a default image in public folder

const BooksPage: React.FC = () => {
  const [booksList, setBooksList] = useState<IBook[]>([]);
  const [userBooksList, setUserBooksList] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [availableAuthors, setAvailableAuthors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // Load user safely
  const storedUser = localStorage.getItem('user');
  let user: IUser = {};
  try {
    user = storedUser ? JSON.parse(storedUser) : {};
  } catch {
    user = {};
  }

  // Fetch books and user books
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get<IBook[]>('https://bookflow-apis.onrender.com/api/books');
        if (Array.isArray(response.data)) {
          setBooksList(response.data);
          setAvailableGenres([...new Set(response.data.map(b => b.genre))]);
          setAvailableAuthors([...new Set(response.data.map(b => b.author))]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const getUserBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await axios.get<IBook[]>('https://bookflow-apis.onrender.com/api/user-books', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(response.data)) setUserBooksList(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getBooks();
    getUserBooks();
  }, []);

  // Filtered books
  const filteredBooks = booksList.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchInput.toLowerCase());
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(book.genre);
    const matchesAuthor = selectedAuthors.length === 0 || selectedAuthors.includes(book.author);
    return matchesSearch && matchesGenre && matchesAuthor;
  });

  // Reset page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput, selectedGenres, selectedAuthors]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <>
      <Header />
      <div className="books-section-main">
        {/* Sidebar */}
        <div className="sidebar-column">
          <div className="profile-card">
            <div className="profile-avatar">
              {user.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h2 className="profile-name">{user.username || 'Guest User'}</h2>
            <p className="profile-email">{user.email || 'No email available'}</p>
            <p className="profile-bio">📚 Book lover and expert manager</p>
          </div>

          <hr className="filter-divider" />
          <div className="filters-container">
            <div className="filter-group">
              <h4 className="filter-title">Genres</h4>
              {availableGenres.map(genre => (
                <div key={genre}>
                  <label>
                    <input
                      type="checkbox"
                      value={genre}
                      checked={selectedGenres.includes(genre)}
                      onChange={e => {
                        const { value, checked } = e.target;
                        setSelectedGenres(prev => (checked ? [...prev, value] : prev.filter(g => g !== value)));
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
              {availableAuthors.map(author => (
                <div key={author}>
                  <label>
                    <input
                      type="checkbox"
                      value={author}
                      checked={selectedAuthors.includes(author)}
                      onChange={e => {
                        const { value, checked } = e.target;
                        setSelectedAuthors(prev => (checked ? [...prev, value] : prev.filter(a => a !== value)));
                      }}
                    />
                    {author}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Books List */}
        <div className="books-list-column">
          <div className="search-bar-wrapper">
            <input
              type="text"
              placeholder="Search books by title"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="search-input"
            />
          </div>

          <ul className="books-list">
            {isLoading
              ? Array.from({ length: 8 }).map((_, idx) => <BookCardSkeleton key={idx} />)
              : currentBooks.length > 0
              ? currentBooks.map(book => (
                  <BookCard
                    key={book._id}
                    book={{ ...book, image: book.image || DEFAULT_BOOK_IMAGE }}
                  />
                ))
              : <div className="no-books-found">No books found.</div>
            }
          </ul>

          {/* Pagination */}
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

          {/* User Added Books */}
          {userBooksList.length > 0 && !isLoading && (
            <div className="user-books-section">
              <h2 className="user-books-title">User Added Books</h2>
              <ul className="books-list">
                {userBooksList.map(book => (
                  <BookCard
                    key={book._id}
                    book={{ ...book, image: book.image || DEFAULT_BOOK_IMAGE }}
                    linkPrefix="/user-books"
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BooksPage;
