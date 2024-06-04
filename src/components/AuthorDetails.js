import React, { useState, useEffect } from 'react';
import { getAuthorDetails } from '../services/bookService';

const AuthorDetails = ({ authorKey }) => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      setLoading(true);
      const data = await getAuthorDetails(authorKey);
      setAuthor(data);
      setLoading(false);
    };

    fetchAuthorDetails();
  }, [authorKey]);

  if (loading) return <p>Loading...</p>;
  if (!author) return null;

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold">{author.name}</h3>
      <p>Best Work: {author.top_work}</p>
      <p>Date of Birth: {author.birth_date}</p>
    </div>
  );
};

export default AuthorDetails;
