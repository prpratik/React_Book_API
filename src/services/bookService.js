import axios from 'axios';

const API_URL = 'https://openlibrary.org';

export const searchBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_URL}/search.json`, {
      params: { title },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching books by title:', error);
    return { docs: [] };
  }
};

export const fetchAuthorDetails = async (authorKey) => {
  try {
    const response = await axios.get(`${API_URL}/authors/${authorKey}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching author details:', error);
    return null;
  }
};
