import React, { useState, useEffect } from 'react';
import './SeriesList.css';

const SeriesList = ({ handleAddToLibrary, library, handleRemoveFromLibrary }) => {
  const [series, setSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [seriesPerPage] = useState(12);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const API_KEY = '9e92c4e4';

  // Popular series to show by default
  const popularSeries = ['breaking bad', 'game of thrones', 'stranger things', 'the office', 'friends', 'the walking dead'];

  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true);
      try {
        // Fetch multiple popular series
        const seriesPromises = popularSeries.map(async (seriesName) => {
          const response = await fetch(
            `https://www.omdbapi.com/?s=${encodeURIComponent(seriesName)}&type=series&apikey=${API_KEY}`
          );
          const data = await response.json();
          return data.Response === 'True' ? data.Search : [];
        });

        const allSeriesResults = await Promise.all(seriesPromises);
        const flattenedSeries = allSeriesResults.flat();
        
        // Remove duplicates based on imdbID
        const uniqueSeries = flattenedSeries.filter((series, index, self) =>
          index === self.findIndex((s) => s.imdbID === series.imdbID)
        );
        
        setSeries(uniqueSeries);
      } catch (error) {
        setError('Error fetching series');
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, []);

  const fetchSeriesBySearch = async () => {
    if (searchQuery.trim() === '') {
      setError('Please enter a series name to search!');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&type=series&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.Response === 'True') {
        setSeries(data.Search);
        setCurrentPage(1);
      } else {
        setError(data.Error || 'No series found');
        setSeries([]);
      }
    } catch (error) {
      setError('Error fetching series');
      setSeries([]);
    } finally {
      setLoading(false);
    }
  };

  const getSortedSeries = () => {
    let sortedSeries = [...series];
    switch (sortBy) {
      case 'title':
        return sortedSeries.sort((a, b) => a.Title.localeCompare(b.Title));
      case 'year':
        return sortedSeries.sort((a, b) => (b.Year || 0) - (a.Year || 0));
      case 'popularity':
      default:
        return sortedSeries;
    }
  };

  const indexOfLastSeries = currentPage * seriesPerPage;
  const indexOfFirstSeries = indexOfLastSeries - seriesPerPage;
  const currentSeries = getSortedSeries().slice(indexOfFirstSeries, indexOfLastSeries);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getHighQualityPoster = (posterUrl) => {
    if (!posterUrl || posterUrl === 'N/A') {
      return '/api/placeholder/400/600';
    }
    // Replace with higher resolution version
    return posterUrl.replace('SX300', 'SX600').replace('._V1_', '._V1_SX600_CR0,0,600,900_');
  };

  return (
    <div className="series-page">
      {/* Hero Section */}
      <section className="series-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-icon">📺</span>
              Discover Amazing TV Series
            </h1>
            <p className="hero-subtitle">
              Explore captivating TV series, from drama to comedy, sci-fi to documentaries.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="search-container">
              <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for TV series..."
                  className="search-input focus-ring"
                  onKeyPress={(e) => e.key === 'Enter' && fetchSeriesBySearch()}
                />
                <button 
                  className="btn btn-primary search-btn" 
                  onClick={fetchSeriesBySearch}
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

      {/* Series Grid Section */}
      <section className="series-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular TV Series'}
            </h2>
            
            <div className="controls-bar">
              <div className="series-count">
                {series.length} {series.length === 1 ? 'series' : 'series'} found
              </div>
              
              <div className="view-controls">
                <div className="control-group">
                  <label htmlFor="sortBy" className="control-label">Sort by:</label>
                  <select
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="control-select"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="title">Title</option>
                    <option value="year">Year</option>
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
              <p className="loading-text">Discovering amazing TV series...</p>
            </div>
          ) : (
            <>
              <div className={`series-grid grid ${viewMode === 'list' ? 'series-list' : 'grid-cols-4'}`}>
                {currentSeries.map((series, index) => (
                  <div
                    className={`series-card card ${viewMode === 'list' ? 'series-card-list' : ''}`}
                    key={series.imdbID}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="series-poster-container">
                      <img 
                        src={getHighQualityPoster(series.Poster)} 
                        alt={`${series.Title} Poster`} 
                        className="series-poster"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/400/600';
                        }}
                      />
                      <div className="series-overlay">
                        <button
                          className="btn btn-primary btn-sm overlay-btn"
                          onClick={() => handleAddToLibrary(series)}
                          title="Add to Library"
                        >
                          <span>📚</span>
                          Add to Library
                        </button>
                      </div>
                      <div className="series-type-badge">
                        📺 TV Series
                      </div>
                    </div>
                    
                    <div className="series-info">
                      <h3 className="series-title" title={series.Title}>
                        {series.Title}
                      </h3>
                      <p className="series-year text-secondary">
                        {series.Year}
                      </p>
                      {viewMode === 'list' && (
                        <div className="series-actions">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleAddToLibrary(series)}
                          >
                            <span>📚</span>
                            Add to Library
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {Math.ceil(series.length / seriesPerPage) > 1 && (
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
                      {Array.from({ length: Math.ceil(series.length / seriesPerPage) }).map((_, index) => {
                        const pageNumber = index + 1;
                        const isActive = currentPage === pageNumber;
                        const showPage = pageNumber === 1 || 
                                       pageNumber === Math.ceil(series.length / seriesPerPage) ||
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
                      disabled={currentPage === Math.ceil(series.length / seriesPerPage)}
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

export default SeriesList;
