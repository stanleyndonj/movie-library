import React, { useState, useEffect } from 'react';
import './MovieList.css';
import Slideshow from './Slideshow'; // Import Slideshow component

const MovieList = ({ handleAddToLibrary, library, handleRemoveFromLibrary }) => {
  const [movies, setMovies] = useState([]); // Combined OMDb and json-server movies
  const [localMovies, setLocalMovies] = useState([]); // Store movies from json-server
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const API_KEY = '9e92c4e4';
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  // Function to get high quality poster or fallback
  const getHighQualityPoster = (posterUrl, title = '') => {
    if (!posterUrl || posterUrl === 'N/A') {
      // Use a better placeholder service with the movie title
      return `https://via.placeholder.com/400x600/6366f1/ffffff?text=${encodeURIComponent(title.slice(0, 20) || 'No Image')}`;
    }
    
    // Try to get higher resolution from OMDb API
    let highQualityUrl = posterUrl;
    
    // Replace common OMDb resolution parameters with higher quality ones
    if (posterUrl.includes('SX300')) {
      highQualityUrl = posterUrl.replace('SX300', 'SX600');
    } else if (posterUrl.includes('._V1_')) {
      // Add higher resolution parameters to OMDb URLs
      highQualityUrl = posterUrl.replace('._V1_', '._V1_SX600_CR0,0,600,900_');
    }
    
    return highQualityUrl;
  };

  // Fetch movies from OMDb and json-server
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        // Fetch movies from OMDb API
        const response = await fetch(`https://www.omdbapi.com/?s=avengers&type=movie&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === 'True') {
          const omdbMovies = data.Search;

          // Fetch movies from json-server
          const localResponse = await fetch(`${API_URL}/movies`);
          const localData = await localResponse.json();

          setLocalMovies(localData); // Store locally fetched movies
          setMovies([...omdbMovies, ...localData]); // Combine OMDb and local movies
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
  }, [API_KEY, API_URL]); // Adding missing dependencies

  // Fetch movies based on search query
  const fetchMoviesBySearch = async () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a movie name to search!');
      return;
    }

    setLoading(true);
    setError(''); // Clear previous errors before making a new search
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&type=movie&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies([...data.Search, ...localMovies]); // Combine with locally added movies
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
    <div className="movie-list-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Amazing <span className="hero-highlight">Movies</span>
            </h1>
            <p className="hero-subtitle">
              Explore thousands of movies, build your personal library, and never miss a great film again.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="search-container">
              <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for movies, series, or episodes..."
                  className="search-input focus-ring"
                  onKeyPress={(e) => e.key === 'Enter' && fetchMoviesBySearch()}
                />
                <button 
                  className="btn btn-primary search-btn" 
                  onClick={fetchMoviesBySearch}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-spin">⭯</span>
                  ) : (
                    'Search'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slideshow Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Movies</h2>
          <Slideshow movies={movies} />
        </div>
      </section>

      {/* Movies Grid Section */}
      <section className="movies-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
            </h2>
            <div className="movies-count">
              {movies.length} {movies.length === 1 ? 'movie' : 'movies'} found
            </div>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner animate-spin">⭯</div>
              <p className="loading-text">Discovering amazing movies...</p>
            </div>
          ) : (
            <>
              <div className="movie-grid grid grid-cols-4">
                {currentMovies.map((movie, index) => (
                  <div
                    className="movie-card card"
                    key={movie.imdbID || movie.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="movie-poster-container">
                      <img 
                        src={getHighQualityPoster(movie.Poster || movie.poster, movie.Title || movie.title)} 
                        alt={`${movie.Title || movie.title} Poster`} 
                        className="movie-poster"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x600/6366f1/ffffff?text=${encodeURIComponent((movie.Title || movie.title || 'No Image').slice(0, 20))}`;
                        }}
                      />
                      <div className="movie-overlay">
                        <button
                          className="btn btn-primary btn-sm overlay-btn"
                          onClick={() => handleAddToLibrary(movie)}
                          title="Add to Library"
                        >
                          <span>📚</span>
                          Add to Library
                        </button>
                      </div>
                    </div>
                    
                    <div className="movie-info">
                      <h3 className="movie-title" title={movie.Title || movie.title}>
                        {movie.Title || movie.title}
                      </h3>
                      <p className="movie-year text-secondary">
                        {movie.Year || movie.releaseDate}
                      </p>
                      {movie.Type && (
                        <span className="movie-type-badge">
                          {movie.Type}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {Math.ceil(movies.length / moviesPerPage) > 1 && (
                <div className="pagination-container">
                  <div className="pagination">
                    <button
                      className="btn btn-secondary btn-sm pagination-btn"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      ← Previous
                    </button>
                    
                    <div className="pagination-numbers">
                      {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }).map((_, index) => {
                        const pageNumber = index + 1;
                        const isActive = currentPage === pageNumber;
                        const showPage = pageNumber === 1 || 
                                       pageNumber === Math.ceil(movies.length / moviesPerPage) ||
                                       Math.abs(pageNumber - currentPage) <= 2;
                        
                        if (!showPage) {
                          if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                            return <span key={pageNumber} className="pagination-ellipsis">...</span>;
                          }
                          return null;
                        }
                        
                        return (
                          <button
                            key={pageNumber}
                            className={`btn btn-sm pagination-number ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => paginate(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      className="btn btn-secondary btn-sm pagination-btn"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(movies.length / moviesPerPage)}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default MovieList;
