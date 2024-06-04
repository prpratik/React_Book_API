const API_BASE_URL = 'https://openlibrary.org';

export const searchBooksByTitle = async (title) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search.json?title=${title}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching books by title:", error);
    throw error;
  }
};

export const fetchAuthorDetails = async (authorKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}/authors/${authorKey}.json`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching author details:", error);
    throw error;
  }
};
