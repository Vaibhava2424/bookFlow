import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "./Home";
import BooksPage from "./BooksPage";
import AddBookPage from "./AddBookPage";
import DetailedBook from "./DetailedBookPage";
import UserBookDetailsPage from "./UserDetailedBookPage";
import About from "./AboutPage";
import LandingPage from "./LandingPage";
import Signup from "./SignupPage";
import Signin from "./SigninPage";
import ProtectedRoute from "./ProtectedRoute";

// PublicRoute wrapper to prevent logged-in users from accessing public pages
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : <>{children}</>;
};

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Root path: redirect to Home if logged in, else LandingPage */}
        <Route
          path="/"
          element={
            token ? (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ) : (
              <Navigate to="/LandingPage" replace />
            )
          }
        />

        {/* Public routes */}
        <Route
          path="/LandingPage"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/BooksPage"
          element={
            <ProtectedRoute>
              <BooksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id"
          element={
            <ProtectedRoute>
              <DetailedBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-books/:id"
          element={
            <ProtectedRoute>
              <UserBookDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-book"
          element={
            <ProtectedRoute>
              <AddBookPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
