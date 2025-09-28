export const OMDB_CONFIG = {
  BASE_URL: 'http://www.omdbapi.com/',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
  }
};

export const fetchMovies = async ({ query }: { query: string }) => {
  // Construct OMDb endpoint
  const endpoint = query
    ? `?s=${encodeURIComponent(query)}&apikey=${OMDB_CONFIG.API_KEY}` // search by keyword
    : `?s=movie&apikey=${OMDB_CONFIG.API_KEY}`; // fallback search if no query

  const response = await fetch(`${OMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: OMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data.Search || []; // OMDb returns results in 'Search' array
};
