import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import MovieDetail from './components/MovieDetail';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Library from './components/Library';
import './App.css'; // Ensure this file handles light/dark theme styles
import SeriesList from './components/SeriesList';
import EpisodesList from './components/EpisodesList';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [library, setLibrary] = useState([]);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch the movie library from the backend on page load
  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await fetch(`${API_URL}/movies`);
        const data = await response.json();
        setLibrary(data);
      } catch (error) {
        console.error('Error fetching library:', error);
      }
    };
    fetchLibrary();
  }, []);

  // Add movie to library (json-server)
  const handleAddToLibrary = async (movie) => {
    try {
      const response = await fetch(`${API_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: movie.Title || movie.title,
          releaseDate: movie.Year || movie.releaseDate,
          poster: movie.Poster || movie.poster,
          imdbID: movie.imdbID || movie.id, // Store OMDb or local ID
        }),
      });

      if (response.ok) {
        const newMovie = await response.json();
        setLibrary((prevLibrary) => [...prevLibrary, newMovie]);
      } else {
        console.error('Failed to add movie to library');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  // Remove movie from library (json-server)
  const handleRemoveFromLibrary = async (movieId) => {
    try {
      const response = await fetch(`${API_URL}/movies/${movieId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLibrary((prevLibrary) =>
          prevLibrary.filter((movie) => movie.imdbID !== movieId && movie.id !== movieId) // Handle both imdbID and local id
        );
      } else {
        console.error('Failed to remove movie from library');
      }
    } catch (error) {
      console.error('Error removing movie:', error);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const fetchMoviesBySearch = () => {
    // Implement search functionality here or pass it down from MovieList if already implemented there.
  };

  // Update body class when theme changes
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Router>
      <div className={`App ${theme}`}>
        <NavBar
          toggleTheme={toggleTheme}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          fetchMoviesBySearch={fetchMoviesBySearch}
        />
        <Routes>
          <Route
            path="/"
            element={
              <MovieList
                handleAddToLibrary={handleAddToLibrary}
                library={library}
                handleRemoveFromLibrary={handleRemoveFromLibrary}
              />
            }
          />
          <Route path="/add-movie" element={<AddMovieForm />} />
          <Route
            path="/library"
            element={
              <Library
                library={library}
                handleRemoveFromLibrary={handleRemoveFromLibrary}
              />
            }
          />
          <Route
            path="/series"
            element={
              <SeriesList
                handleAddToLibrary={handleAddToLibrary}
                library={library}
                handleRemoveFromLibrary={handleRemoveFromLibrary}
              />
            }
          />
          <Route
            path="/episodes"
            element={
              <EpisodesList
                handleAddToLibrary={handleAddToLibrary}
                library={library}
                handleRemoveFromLibrary={handleRemoveFromLibrary}
              />
            }
          />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
