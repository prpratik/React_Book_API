import React, { useState } from 'react';
import '../styles/BookSearch.css';

const BookSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="book-search-container flex">
      <input
        type="text"
        className="book-search-input flex-grow"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className="book-search-button ml-2"
        onClick={() => onSearch(searchTerm)}
      >
        Search
      </button>
    </div>
  );
};

export default BookSearch;
