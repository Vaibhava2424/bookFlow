import React from "react";
import { useNavigate } from "react-router-dom";

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  image: string;
  description?: string;
  publishedDate?: string;
}

interface Props {
  book: IBook;
  linkPrefix?: string; // "/books" or "/user-books"
}

const BookCard: React.FC<Props> = ({ book, linkPrefix = "/books" }) => {
  const navigate = useNavigate();

  return (
    <div className="book-card-container" onClick={() => navigate(`${linkPrefix}/${book._id}`)}>
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
    </div>
  );
};

export default BookCard;
