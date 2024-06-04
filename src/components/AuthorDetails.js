import React, { useEffect, useState } from 'react';
import { fetchAuthorDetails } from '../services/bookService';

const AuthorDetails = ({ authorKey }) => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await fetchAuthorDetails(authorKey);
        setAuthor(data);
      } catch (error) {
        console.error('Error fetching author details:', error);
      }
    };

    fetchAuthor();
  }, [authorKey]);

  if (!author) return null;

  return (
    <div className="mt-4 p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-2">{author.name}</h2>
      <p>Best Work: {author.best_work}</p>
      <p>Date of Birth: {author.birth_date}</p>
    </div>
  );
};

export default AuthorDetails;
