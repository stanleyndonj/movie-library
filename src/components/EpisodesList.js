import React, { useState, useEffect } from 'react';
import './EpisodesList.css';

const EpisodesList = ({ handleAddToLibrary, library, handleRemoveFromLibrary }) => {
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesPerPage] = useState(16);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedSeries, setSelectedSeries] = useState('');
  const API_KEY = '9e92c4e4';

  // Popular series for episodes
  const popularSeries = [
    'breaking bad', 'game of thrones', 'stranger things', 
    'the office', 'friends', 'the walking dead', 'sherlock',
    'house of cards', 'westworld', 'black mirror'
  ];

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        // Fetch episodes from multiple series
        const episodePromises = popularSeries.slice(0, 3).map(async (seriesName) => {
          const response = await fetch(
            `https://www.omdbapi.com/?s=${encodeURIComponent(seriesName)}&type=episode&apikey=${API_KEY}`
          );
          const data = await response.json();
          return data.Response === 'True' ? data.Search : [];
        });

        const allEpisodesResults = await Promise.all(episodePromises);
        const flattenedEpisodes = allEpisodesResults.flat();
        
        // Remove duplicates based on imdbID
        const uniqueEpisodes = flattenedEpisodes.filter((episode, index, self) =>
          index === self.findIndex((e) => e.imdbID === episode.imdbID)
        );
        
        setEpisodes(uniqueEpisodes);
      } catch (error) {
        setError('Error fetching episodes');
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, []);

  const fetchEpisodesBySearch = async () => {
    if (searchQuery.trim() === '') {
      setError('Please enter an episode or series name to search!');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&type=episode&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.Response === 'True') {
        setEpisodes(data.Search);
        setCurrentPage(1);
      } else {
        setError(data.Error || 'No episodes found');
        setEpisodes([]);
      }
    } catch (error) {
      setError('Error fetching episodes');
      setEpisodes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchEpisodesBySeries = async (seriesName) => {
    if (!seriesName) return;
    
    setLoading(true);
    setError('');
    setSelectedSeries(seriesName);
    
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(seriesName)}&type=episode&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.Response === 'True') {
        setEpisodes(data.Search);
        setCurrentPage(1);
      } else {
        setError(`No episodes found for "${seriesName}"`);
        setEpisodes([]);
      }
    } catch (error) {
      setError('Error fetching episodes');
      setEpisodes([]);
    } finally {
      setLoading(false);
    }
  };

  const getSortedEpisodes = () => {
    let sortedEpisodes = [...episodes];
    switch (sortBy) {
      case 'title':
        return sortedEpisodes.sort((a, b) => a.Title.localeCompare(b.Title));
      case 'year':
        return sortedEpisodes.sort((a, b) => (b.Year || 0) - (a.Year || 0));
      case 'relevance':
      default:
        return sortedEpisodes;
    }
  };

  const indexOfLastEpisode = currentPage * episodesPerPage;
  const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
  const currentEpisodes = getSortedEpisodes().slice(indexOfFirstEpisode, indexOfLastEpisode);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getHighQualityPoster = (posterUrl) => {
    if (!posterUrl || posterUrl === 'N/A') {
      return '/api/placeholder/400/300';
    }
    // Replace with higher resolution version
    return posterUrl.replace('SX300', 'SX600').replace('._V1_', '._V1_SX600_CR0,0,600,400_');
  };

  const getEpisodeInfo = (title) => {
    // Extract season and episode info if available
    const episodeMatch = title.match(/S(\d+)E(\d+)/i);
    if (episodeMatch) {
      return `S${episodeMatch[1]}E${episodeMatch[2]}`;
    }
    return null;
  };

  return (
    <div className="episodes-page">
      {/* Hero Section */}
      <section className="episodes-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-icon">🎞️</span>
              Explore TV Episodes
            </h1>
            <p className="hero-subtitle">
              Dive into individual episodes from your favorite TV series and discover hidden gems.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="search-container">
              <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for episodes or series..."
                  className="search-input focus-ring"
                  onKeyPress={(e) => e.key === 'Enter' && fetchEpisodesBySearch()}
                />
                <button 
                  className="btn btn-primary search-btn" 
                  onClick={fetchEpisodesBySearch}
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

            {/* Popular Series Quick Access */}
            <div className="quick-series">
              <p className="quick-series-label">Or browse episodes from:</p>
              <div className="series-chips">
                {popularSeries.slice(0, 6).map((series) => (
                  <button
                    key={series}
                    className={`series-chip ${selectedSeries === series ? 'series-chip-active' : ''}`}
                    onClick={() => fetchEpisodesBySeries(series)}
                  >
                    {series.charAt(0).toUpperCase() + series.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Grid Section */}
      <section className="episodes-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {selectedSeries 
                ? `Episodes from "${selectedSeries.charAt(0).toUpperCase() + selectedSeries.slice(1)}"` 
                : searchQuery 
                  ? `Search Results for "${searchQuery}"` 
                  : 'Featured Episodes'
              }
            </h2>
            
            <div className="controls-bar">
              <div className="episodes-count">
                {episodes.length} {episodes.length === 1 ? 'episode' : 'episodes'} found
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
                    <option value="relevance">Relevance</option>
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
              <p className="loading-text">Loading episodes...</p>
            </div>
          ) : (
            <>
              <div className={`episodes-grid grid ${viewMode === 'list' ? 'episodes-list' : 'grid-cols-4'}`}>
                {currentEpisodes.map((episode, index) => (
                  <div
                    className={`episode-card card ${viewMode === 'list' ? 'episode-card-list' : ''}`}
                    key={episode.imdbID}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="episode-poster-container">
                      <img 
                        src={getHighQualityPoster(episode.Poster)} 
                        alt={`${episode.Title} Screenshot`} 
                        className="episode-poster"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/400/300';
                        }}
                      />
                      <div className="episode-overlay">
                        <button
                          className="btn btn-primary btn-sm overlay-btn"
                          onClick={() => handleAddToLibrary(episode)}
                          title="Add to Library"
                        >
                          <span>📚</span>
                          Add to Library
                        </button>
                      </div>
                      <div className="episode-type-badge">
                        🎞️ Episode
                      </div>
                      {getEpisodeInfo(episode.Title) && (
                        <div className="episode-number-badge">
                          {getEpisodeInfo(episode.Title)}
                        </div>
                      )}
                    </div>
                    
                    <div className="episode-info">
                      <h3 className="episode-title" title={episode.Title}>
                        {episode.Title}
                      </h3>
                      <p className="episode-year text-secondary">
                        {episode.Year}
                      </p>
                      {viewMode === 'list' && (
                        <div className="episode-actions">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleAddToLibrary(episode)}
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

              {episodes.length === 0 && !loading && (
                <div className="empty-episodes">
                  <div className="empty-icon">🎞️</div>
                  <h3 className="empty-title">No episodes found</h3>
                  <p className="empty-description">
                    Try searching for a different series or episode name.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {Math.ceil(episodes.length / episodesPerPage) > 1 && (
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
                      {Array.from({ length: Math.ceil(episodes.length / episodesPerPage) }).map((_, index) => {
                        const pageNumber = index + 1;
                        const isActive = currentPage === pageNumber;
                        const showPage = pageNumber === 1 || 
                                       pageNumber === Math.ceil(episodes.length / episodesPerPage) ||
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
                      disabled={currentPage === Math.ceil(episodes.length / episodesPerPage)}
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

export default EpisodesList;
