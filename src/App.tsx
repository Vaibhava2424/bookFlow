import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "./Home";
import BooksPage from "./BooksPage";
import AddBookPage from "./AddBookPage";
import DetailedBook from "./DetailedBookPage";
import UserBookDetailsPage from './UserDetailedBookPage/index.tsx';
import About from "./AboutPage";
import LandingPage from "./LandingPage";
import Signup from "./SignupPage";
import Signin from "./SigninPage";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "../ScrollTop";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Root path: Landing page is public */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
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

        {/* Fallback → redirect to landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
