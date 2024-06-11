import React, { useEffect, useState } from 'react';
import { fetchAuthorDetails } from '../services/bookService'; // Importing the service function to fetch author details, used fetchAuthorDetails to fetch data
import '../styles/AuthorDetails.css'; // Importing the CSS file for styling

const AuthorDetails = ({ authorKey }) => {
  const [author, setAuthor] = useState(null); // for storing author details
  const [loading, setLoading] = useState(true); // this is to manage loading state 

  // this function is used to fetch author details .
  useEffect(() => {
    const fetchAuthor = async () => {
      setLoading(true); // initially loading state is set to true 
      const data = await fetchAuthorDetails(authorKey); // author details is taken according to the give key 
      setAuthor(data); // Storing the fetched data 
      setLoading(false); // after storing, loading is set to false 
    };

    fetchAuthor(); // run again the fetchAuthor function when search key changes 
  }, [authorKey]); // to ensure that function run on key changing 

  if (loading) {
    return (
      <div className="author-details-loading">
        <div className="loader"></div>
      </div>
    );
  }
  
  // if no result is available 
  if (!author) {
    return <p className="text-center text-xl">No author details available.</p>; 
  }

  // to find best work and date
  const bestWork = author.works ? author.works[0].title : 'N/A'; 
  const birthDate = author.birth_date ? author.birth_date : 'N/A'; 
  return (
    <div className="author-details-container p-4 border border-gray-300 rounded shadow">
      <h2 className="author-name text-2xl font-bold mb-2">{author.name}</h2> 
      <p className="author-info mb-1">Best Work: {author.bestWork}</p>
      <p className="author-info">Date of Birth: {author.birthDate}</p> 
    </div>
  );
};

export default AuthorDetails;
