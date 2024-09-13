// MovieList.js
import React, { useState, useEffect } from 'react';
import './MovieList.css';

const MovieList = ({ handleAddToLibrary, library, handleRemoveFromLibrary }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8); // 8 movies per page for 2 rows
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const API_KEY = '9e92c4e4';

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://www.omdbapi.com/?s=avengers&apikey=${API_KEY}`);
        const data = await response.json();
        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setError(data.Error);
        }
      } catch (error) {
        setError('Error fetching movies');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const fetchMoviesBySearch = async () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a movie name to search!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }
    } catch (error) {
      setError('Error fetching movies');
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main">
      <h2>Movie List</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button className="search-btn" onClick={fetchMoviesBySearch}>
          Search
        </button>
      </div>

      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="movie-grid">
            {currentMovies.map((movie) => (
              <div
                className="movie-tile"
                key={movie.imdbID}
                onMouseEnter={() => console.log('Hovered!')}
              >
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <img src={movie.Poster} alt={`${movie.Title} Poster`} width="100" />
                <button
                  className="add-to-library-btn"
                  onClick={() => handleAddToLibrary(movie)}
                >
                  Add to Library
                </button>
              </div>
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }, (_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>

          {/* Display Movies in Library */}
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
        </>
      )}
    </div>
  );
};

export default MovieList;
