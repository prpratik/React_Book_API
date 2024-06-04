import React, { useState } from 'react';

const BookSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title"
        className="border p-2 rounded-lg w-full"
      />
      <button
        onClick={handleSearch}
        className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
      >
        Search
      </button>
    </div>
  );
};

export default BookSearch;
