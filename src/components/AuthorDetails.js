import React, { useEffect, useState } from 'react';
import { fetchAuthorDetails } from '../services/bookService';
import '../styles/AuthorDetails.css'; 

const AuthorDetails = ({ authorKey }) => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true);
      const data = await fetchAuthorDetails(authorKey);
      setAuthor(data);
      setLoading(false);
    };

    fetchAuthor();
  }, [authorKey]);

  if (loading) {
    return <p className="text-center text-xl">Loading author details...</p>;
  }

  if (!author) {
    return <p className="text-center text-xl">No author details available.</p>;
  }

  const bestWork = author.works ? author.works[0].title : 'N/A';
  const birthDate = author.birth_date ? author.birth_date : 'N/A';

  return (
    <div className="author-details-container p-4 border border-gray-300 rounded shadow">
      <h2 className="author-name text-2xl font-bold mb-2">{author.name}</h2>
      <p className="author-info mb-1">Best Work: {bestWork}</p>
      <p className="author-info">Date of Birth: {birthDate}</p>
    </div>
  );
};

export default AuthorDetails;
