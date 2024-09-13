import React, { useState, useEffect } from 'react';

const Library = () => {
  const [movies, setMovies] = useState([]); // State to hold the list of movies
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch movies from the backend API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8000/movies'); // Assuming your backend runs on port 8000
        const data = await response.json();
        setMovies(data); // Set the movie data in the state
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchMovies();
  }, []);

  // Conditional rendering based on loading state
  if (loading) {
    return <div>Loading movies...</div>;
  }

  // Render the list of movies
  return (
    <div className="library">
      <h1>Movie Library</h1>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Director: {movie.director}</p>
              <p>Year: {movie.year}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found in the library.</p>
      )}
    </div>
  );
};

export default Library;
