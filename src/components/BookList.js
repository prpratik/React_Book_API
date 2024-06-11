import React, { useState, useEffect } from 'react';
import { searchBooksByTitle } from '../services/bookService';
import BookSearch from './BookSearch';
import AuthorDetails from './AuthorDetails';
import '../styles/BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showAuthorDetails, setShowAuthorDetails] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterYear, setFilterYear] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (title = '') => {
    setLoading(true);
    const data = await searchBooksByTitle(title);
    setBooks(data.docs);
    setLoading(false);
    setShowAuthorDetails(false);
    setCurrentPage(1); // Reset current page to 1 for new searches
  };

  const handleAuthorClick = (authorKey) => {
    setSelectedAuthor(authorKey);
    setShowAuthorDetails(true);
  };

  const handleBackClick = () => {
    setShowAuthorDetails(false);
    setSelectedAuthor(null);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filterBooksByYear = (year) => {
    setFilterYear(year);
  };

  const filterBooksByAuthor = (author) => {
    setFilterAuthor(author);
  };

  const sortedBooks = [...books].sort((a, b) => {
    if (sortField === 'title') {
      const titleA = a.title || '';
      const titleB = b.title || '';
      return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    } else if (sortField === 'author') {
      const authorA = a.author_name ? a.author_name[0] : '';
      const authorB = b.author_name ? b.author_name[0] : '';
      return sortOrder === 'asc' ? authorA.localeCompare(authorB) : authorB.localeCompare(authorA);
    } else if (sortField === 'first_publish_year') {
      return sortOrder === 'asc' ? (a.first_publish_year || 0) - (b.first_publish_year || 0) : (b.first_publish_year || 0) - (a.first_publish_year || 0);
    }
    return 0;
  });

  const filteredBooks = sortedBooks.filter(book => {
    return (filterYear ? book.first_publish_year == filterYear : true) &&
           (filterAuthor ? book.author_name?.some(author => author.toLowerCase().includes(filterAuthor.toLowerCase())) : true);
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredBooks.length / booksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="book-list-header">Book List</div>
      <BookSearch onSearch={fetchBooks} />
      {loading ? (
        <div className="book-list-loading">
          <div className="loader"></div>
        </div>
      ) : showAuthorDetails ? (
        <div className="author-details-container">
          <button onClick={handleBackClick} className="back-button">
            Back to Book List
          </button>
          <AuthorDetails authorKey={selectedAuthor} />
        </div>
      ) : (
        <div className="book-list">
          <div className="sorting-options">
            <button className="sort-button" onClick={() => handleSort('title')}>
              Sort by Title {sortField === 'title' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </button>
            <button className="sort-button" onClick={() => handleSort('author')}>
              Sort by Author {sortField === 'author' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </button>
            <button className="sort-button" onClick={() => handleSort('first_publish_year')}>
              Sort by Year {sortField === 'first_publish_year' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </button>
          </div>
          <div className="filter-options">
            <input
              type="number"
              placeholder="Filter by Year"
              value={filterYear}
              onChange={(e) => filterBooksByYear(e.target.value)}
              className="filter-input"
            />
            <input
              type="text"
              placeholder="Filter by Author"
              value={filterAuthor}
              onChange={(e) => filterBooksByAuthor(e.target.value)}
              className="filter-input"
            />
          </div>
          <ul className="space-y-4">
            {currentBooks.map((book) => (
              <li key={book.key} className="book-item border-b border-gray-300 pb-2">
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
          <div className="pagination">
            {filteredBooks.length > booksPerPage && (
              <div className="pagination-controls">
                <button onClick={prevPage} className="pagination-button" disabled={currentPage === 1}>
                  Previous
                </button>
                {[...Array(Math.ceil(filteredBooks.length / booksPerPage)).keys()].map((num) => (
                  <button
                    key={num}
                    onClick={() => paginate(num + 1)}
                    className={`pagination-button ${currentPage === num + 1 ? 'active' : ''}`}
                  >
                    {num + 1}
                  </button>
                ))}
                <button onClick={nextPage} className="pagination-button" disabled={currentPage === Math.ceil(filteredBooks.length / booksPerPage)}>
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
