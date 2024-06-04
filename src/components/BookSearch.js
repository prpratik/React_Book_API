import React, { useState } from 'react';

const BookSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books"
        className="border p-2 rounded"
      />
      <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </div>
  );
};

export default BookSearch;
