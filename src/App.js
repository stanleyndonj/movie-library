// App.js
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
import Slideshow from './components/Slideshow';

function App() {
  const [library, setLibrary] = useState([]);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToLibrary = (movie) => {
    setLibrary((prevLibrary) => [...prevLibrary, movie]);
  };

  const handleRemoveFromLibrary = (movieId) => {
    setLibrary((prevLibrary) => prevLibrary.filter(movie => movie.imdbID !== movieId));
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
          <Route path="/" element={<MovieList handleAddToLibrary={handleAddToLibrary} library={library} handleRemoveFromLibrary={handleRemoveFromLibrary} />} />
          <Route path="/add-movie" element={<AddMovieForm />} />
          <Route path="/library" element={<Library library={library}  handleRemoveFromLibrary={handleRemoveFromLibrary} />} />
          <Route path="/series" element={<SeriesList handleAddToLibrary={handleAddToLibrary} library={library} handleRemoveFromLibrary={handleRemoveFromLibrary} />} />
          <Route path="/episodes" element={<EpisodesList handleAddToLibrary={handleAddToLibrary} library={library} handleRemoveFromLibrary={handleRemoveFromLibrary} />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
