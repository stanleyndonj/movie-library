import React, { useState } from 'react';
import './Library.css';

const Library = ({ library, handleRemoveFromLibrary }) => {
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showConfirmModal, setShowConfirmModal] = useState(null);

  // Sort library based on selected option
  const getSortedLibrary = () => {
    const sorted = [...library].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return (a.title || a.Title || '').localeCompare(b.title || b.Title || '');
        case 'year':
          return (b.releaseDate || b.Year || 0) - (a.releaseDate || a.Year || 0);
        case 'dateAdded':
        default:
          return (b.id || 0) - (a.id || 0);
      }
    });
    
    if (filterBy === 'all') return sorted;
    return sorted.filter(movie => 
      (movie.Type || movie.type || '').toLowerCase() === filterBy.toLowerCase()
    );
  };

  const handleRemoveClick = (movieId, movieTitle) => {
    setShowConfirmModal({ id: movieId, title: movieTitle });
  };

  const confirmRemove = () => {
    if (showConfirmModal) {
      handleRemoveFromLibrary(showConfirmModal.id);
      setShowConfirmModal(null);
    }
  };

  const sortedLibrary = getSortedLibrary();

  // Function to get high quality poster or fallback
  const getHighQualityPoster = (posterUrl, title = '') => {
    if (!posterUrl || posterUrl === 'N/A') {
      return `https://via.placeholder.com/400x600/6366f1/ffffff?text=${encodeURIComponent((title || 'No Image').slice(0, 20))}`;
    }
    
    let highQualityUrl = posterUrl;
    if (posterUrl.includes('SX300')) {
      highQualityUrl = posterUrl.replace('SX300', 'SX600');
    } else if (posterUrl.includes('._V1_')) {
      highQualityUrl = posterUrl.replace('._V1_', '._V1_SX600_CR0,0,600,900_');
    }
    
    return highQualityUrl;
  };

  return (
    <div className="library-page">
      <div className="container">
        {/* Header Section */}
        <div className="library-header">
          <div className="header-content">
            <h1 className="library-title">
              <span className="library-icon">📚</span>
              Your Movie Library
            </h1>
            <p className="library-subtitle">
              {library.length === 0 
                ? "Start building your personal movie collection" 
                : `${library.length} ${library.length === 1 ? 'movie' : 'movies'} in your collection`
              }
            </p>
          </div>

          {/* Controls */}
          {library.length > 0 && (
            <div className="library-controls">
              <div className="control-group">
                <label htmlFor="sortBy" className="control-label">Sort by:</label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="control-select"
                >
                  <option value="dateAdded">Date Added</option>
                  <option value="title">Title</option>
                  <option value="year">Year</option>
                </select>
              </div>

              <div className="control-group">
                <label htmlFor="filterBy" className="control-label">Filter:</label>
                <select
                  id="filterBy"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="control-select"
                >
                  <option value="all">All Types</option>
                  <option value="movie">Movies</option>
                  <option value="series">Series</option>
                </select>
              </div>

              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'view-btn-active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  ⊞
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'view-btn-active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  ☰
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Library Content */}
        <div className="library-content">
          {library.length === 0 ? (
            <div className="empty-library">
              <div className="empty-illustration">
                <span className="empty-icon">🎬</span>
                <h3 className="empty-title">Your library is empty</h3>
                <p className="empty-description">
                  Start building your collection by adding movies from our catalog or create your own entries.
                </p>
                <div className="empty-actions">
                  <a href="/movies" className="btn btn-primary">
                    Browse Movies
                  </a>
                  <a href="/add-movie" className="btn btn-secondary">
                    Add Movie
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className={`library-grid ${viewMode === 'list' ? 'library-list' : ''}`}>
              {sortedLibrary.map((movie, index) => (
                <div
                  className={`library-item ${viewMode === 'list' ? 'library-item-list' : 'library-item-card'} card`}
                  key={movie.imdbID || movie.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="movie-poster-container">
                                          <img
                        src={getHighQualityPoster(movie.poster || movie.Poster, movie.title || movie.Title)}
                        alt={`${movie.title || movie.Title} Poster`}
                        className="movie-poster"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x600/6366f1/ffffff?text=${encodeURIComponent((movie.title || movie.Title || 'No Image').slice(0, 20))}`;
                        }}
                    />
                    <div className="movie-overlay">
                      <button
                        className="btn btn-danger btn-sm overlay-btn"
                        onClick={() => handleRemoveClick(
                          movie.id || movie.imdbID,
                          movie.title || movie.Title
                        )}
                        title="Remove from Library"
                      >
                        <span>🗑️</span>
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="movie-details">
                    <h3 className="movie-title" title={movie.title || movie.Title}>
                      {movie.title || movie.Title}
                    </h3>
                    <p className="movie-year text-secondary">
                      {movie.releaseDate || movie.Year}
                    </p>
                    {(movie.Type || movie.type) && (
                      <span className="movie-type-badge">
                        {movie.Type || movie.type}
                      </span>
                    )}
                    {movie.genre && (
                      <p className="movie-genre text-muted">
                        {movie.genre}
                      </p>
                    )}
                    {movie.description && viewMode === 'list' && (
                      <p className="movie-description text-secondary">
                        {movie.description.length > 100 
                          ? `${movie.description.substring(0, 100)}...` 
                          : movie.description
                        }
                      </p>
                    )}
                  </div>

                  {viewMode === 'list' && (
                    <div className="movie-actions">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveClick(
                          movie.id || movie.imdbID,
                          movie.title || movie.Title
                        )}
                      >
                        <span>🗑️</span>
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="modal-overlay" onClick={() => setShowConfirmModal(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">Confirm Removal</h3>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove <strong>"{showConfirmModal.title}"</strong> from your library?</p>
              </div>
              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmModal(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={confirmRemove}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
