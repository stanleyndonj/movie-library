// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import MovieDetail from './components/MovieDetail';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Library from './components/Library';
import './App.css'; // Ensure this file handles light/dark theme styles

function App() {
  const [library, setLibrary] = useState([]);
  const [theme, setTheme] = useState('light');

  const handleAddToLibrary = (movie) => {
    setLibrary((prevLibrary) => [...prevLibrary, movie]);
  };

  const handleRemoveFromLibrary = (movieId) => {
    setLibrary((prevLibrary) => prevLibrary.filter(movie => movie.imdbID !== movieId));
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className={`App ${theme}`}>
        <NavBar />
        <button onClick={toggleTheme}>
          Toggle Theme
        </button>
        <Routes>
          <Route path="/" element={<MovieList handleAddToLibrary={handleAddToLibrary} library={library} handleRemoveFromLibrary={handleRemoveFromLibrary} />} />
          <Route path="/add-movie" element={<AddMovieForm />} />
          <Route path="/library" element={<Library library={library} />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
