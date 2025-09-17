import React, { useState, useEffect, type ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import "./index.css";

// Book type
interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  image: string;
  publishedDate: string;
  description: string;
}

const UserBookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Book>>({});
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch book
  useEffect(() => {
    const fetchBook = async () => {
      if (!id) {
        setError("Invalid book ID.");
        setIsLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No auth token found");

        const response = await axios.get<Book>(
          `http://localhost:5000/api/user-books/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setBook(response.data);
        setFormData(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch book details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!id) return;
    setActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      const response = await axios.put<Book>(
        `http://localhost:5000/api/user-books/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBook(response.data);
      setIsEditing(false);
      alert("Book updated successfully!");
    } catch (err) {
      console.error("Failed to update book:", err);
      alert("Failed to update book.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    setActionLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      await axios.delete(`http://localhost:5000/api/user-books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Book deleted successfully.");
      navigate("/BooksPage"); // Redirect to main books page
    } catch (err) {
      console.error("Failed to delete book:", err);
      alert("Failed to delete book.");
    } finally {
      setActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="loading-message">Loading book details...</div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="error-message">{error}</div>
        <Footer />
      </>
    );
  }

  if (!book) {
    return (
      <>
        <Header />
        <div className="not-found-message">Book not found.</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="user-book-details-page">
        <div className="details-container">
          {/* Left: Book Image */}
          <div className="image-column">
            <img src={book.image} alt={book.title} className="book-cover-image" />
            <button className="back-button" onClick={() => navigate(-1)}>
              Back to Books
            </button>
          </div>

          {/* Right: Book Details / Edit Form */}
          <div className="details-column">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Title"
                />
                <input
                  type="text"
                  name="author"
                  value={formData.author || ""}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Author"
                />
                <input
                  type="text"
                  name="genre"
                  value={formData.genre || ""}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Genre"
                />
                <input
                  type="text"
                  name="image"
                  value={formData.image || ""}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Image URL"
                />
                <input
                  type="date"
                  name="publishedDate"
                  value={
                    formData.publishedDate
                      ? new Date(formData.publishedDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleInputChange}
                  className="edit-input"
                />
                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  className="edit-textarea"
                  placeholder="Description"
                />
                <div className="button-group">
                  <button
                    className="save-button"
                    onClick={handleUpdate}
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setIsEditing(false)}
                    disabled={actionLoading}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="book-title">{book.title}</h1>
                <p className="book-detail">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="book-detail">
                  <strong>Genre:</strong> {book.genre}
                </p>
                <p className="book-detail">
                  <strong>Published Date:</strong>{" "}
                  {new Date(book.publishedDate).toLocaleDateString()}
                </p>
                <p className="book-detail">
                  <strong>Description:</strong> {book.description}
                </p>
                <div className="button-group">
                  <button
                    className="edit-button"
                    onClick={() => setIsEditing(true)}
                    disabled={actionLoading}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={handleDelete}
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserBookDetailsPage;
