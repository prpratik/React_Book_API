import axios from 'axios';

const API_URL = 'https://openhttps://openlibrary.org/developers/apilibrary.org';

export const searchBooksByTitle = async (title) => {
  const response = await axios.get(`${API_URL}/search.json?title=${title}`);
  return response.data;
};

export const getAuthorDetails = async (authorKey) => {
  const response = await axios.get(`${API_URL}/authors/${authorKey}.json`);
  return response.data;
};
