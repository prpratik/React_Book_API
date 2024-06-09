import React, { useState, useEffect } from 'react';
import { searchBooksByTitle } from '../services/bookService';
import BookSearch from './BookSearch';
import AuthorDetails from './AuthorDetails';
import '../styles/BookList.css'; // Import the CSS file

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showAuthorDetails, setShowAuthorDetails] = useState(false);

  const fetchBooks = async (title = '') => {
    setLoading(true);
    const data = await searchBooksByTitle(title);
    setBooks(data.docs);
    setLoading(false);
    setShowAuthorDetails(false); // Ensure book list is shown when a new search is made
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAuthorClick = (authorKey) => {
    setSelectedAuthor(authorKey);
    setShowAuthorDetails(true);
  };

  const handleBackClick = () => {
    setShowAuthorDetails(false);
    setSelectedAuthor(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="book-list-header">Book List</div> {/* Apply the header styles */}
      <BookSearch onSearch={fetchBooks} />
      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : showAuthorDetails ? (
        <div className="author-details-container">
          <button onClick={handleBackClick} className="back-button">
            Back to Book List
          </button>
          <AuthorDetails authorKey={selectedAuthor} />
        </div>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.key} className="book-list-item border-b border-gray-300 pb-2">
              <h3 className="book-title text-xl font-semibold">{book.title}</h3>
              <p className="book-details text-gray-700">
                Author:{' '}
                {book.author_name?.map((author, idx) => (
                  <span
                    key={idx}
                    className="book-author text-blue-500 hover:underline cursor-pointer"
                    onClick={() => handleAuthorClick(book.author_key[idx])}
                  >
                    {author}
                  </span>
                ))}
              </p>
              <p className="book-details text-gray-700">First Published: {book.first_publish_year}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
