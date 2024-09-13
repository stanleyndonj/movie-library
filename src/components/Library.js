import React, { useState, useEffect } from 'react';

const Library = ({library,handleRemoveFromLibrary}) => {
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
    <div className="library-section">
    <h2>Your Movie Library</h2>
    {library.length > 0 ? (
      <div className="movie-grid">
        {library.map((movie) => (
          <div className="movie-tile" key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={`${movie.Title} Poster`} width="100" />
            <button
              className="remove-from-library-btn"
              onClick={() => handleRemoveFromLibrary(movie.imdbID)}
            >
              Remove from Library
            </button>
          </div>
        ))}
      </div>
    ) : (
      <p>Your library is empty. Add some movies!</p>
    )}
  </div>
  );
};

export default Library;
