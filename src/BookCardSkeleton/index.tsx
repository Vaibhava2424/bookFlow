import React from "react";
import "./index.css";

const BookCardSkeleton: React.FC = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-text title"></div>
      <div className="skeleton-text author"></div>
      <div className="skeleton-text genre"></div>
    </div>
  );
};

export default BookCardSkeleton;
