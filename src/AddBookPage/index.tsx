import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import Header from "../Header";
import Footer from "../Footer";

interface Book {
  title: string;
  author: string;
  genre: string;
  image: string;
  description: string;
  publishedDate: string;
}

interface AddBookFormProps {
  onBookAdded?: () => void; // <-- optional callback
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onBookAdded }) => {
  const [formData, setFormData] = useState<Book>({
    title: "",
    author: "",
    genre: "",
    image: "",
    description: "",
    publishedDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // ✅ include auth token
      if (!token) {
        setMessage("You must be logged in to add a book.");
        setLoading(false);
        return;
      }

      await axios.post("https://bookflow-apis.onrender.com/api/user-books", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token
        },
      });

      setMessage("Book added to your collection successfully! , you can check it in Books section and edit it there by");
      setFormData({
        title: "",
        author: "",
        genre: "",
        image: "",
        description: "",
        publishedDate: "",
      });

      // ✅ refresh parent list if callback exists
      onBookAdded?.();
    } catch (err) {
      console.error("Error adding book:", err);
      setMessage("Failed to add book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="add-book-page">
        {/* Side Image */}
        <div className="add-book-image">
          <img
            src="https://res.cloudinary.com/dodfv5sbg/image/upload/v1757482471/ebooks-collection-library-archive-e-reading-literature-male-cartoon-character-loading-books-ereader-man-putting-novels-covers-bookshelf_k2zex7.png"
            alt="Books Illustration"
          />
        </div>

        {/* Form */}
        <form className="add-book-form" onSubmit={handleSubmit}>
          <h2>Add a Book</h2>
          {message && <p className="form-message">{message}</p>}

          <input
            className="form-input"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />
          <textarea
            className="form-textarea"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            className="form-input"
            name="publishedDate"
            type="date"
            value={formData.publishedDate}
            onChange={handleChange}
            required
          />
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddBookForm;
