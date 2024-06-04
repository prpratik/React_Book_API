import React from 'react';
import BookList from './components/BookList';
import './index.css'; // Ensure TailwindCSS is included

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <BookList />
    </div>
  );
};

export default App;
