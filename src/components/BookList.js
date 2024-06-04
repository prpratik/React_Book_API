import React, { useState, useEffect } from 'react';
import { searchBooksByTitle } from '../services/bookService';
import BookSearch from './BookSearch';
import AuthorDetails from './AuthorDetails';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const fetchBooks = async (title = '') => {
    setLoading(true);
    try {
      const data = await searchBooksByTitle(title);
      setBooks(data.docs);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAuthorClick = (authorKey) => {
    setSelectedAuthor(authorKey);
  };

  return (
    <div className="p-4">
      <BookSearch onSearch={fetchBooks} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.key} className="border p-4 rounded-lg">
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p>
                Author: 
                {book.author_name?.map((author, idx) => (
                  <span
                    key={idx}
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleAuthorClick(book.author_key[idx])}
                  >
                    {author}
                  </span>
                ))}
              </p>
              <p>First Published: {book.first_publish_year}</p>
            </li>
          ))}
        </ul>
      )}
      {selectedAuthor && <AuthorDetails authorKey={selectedAuthor} />}
    </div>
  );
};

export default BookList;
