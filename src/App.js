import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Library from './components/Library';
import './App.css';

function App() {
  const [library, setLibrary] = useState([]);
  const [theme, setTheme] = useState('light');

  const handleAddToLibrary = (movie) => {
    setLibrary((prevLibrary) => [...prevLibrary, movie]);
  };

  const handleRemoveFromLibrary = (id) => {
    setLibrary((prevLibrary) => prevLibrary.filter((movie) => movie.imdbID !== id));
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className={`App ${theme}`}>
        <NavBar />
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
        </button>
        <Routes>
          <Route path="/" element={<MovieList handleAddToLibrary={handleAddToLibrary} library={library} />} />
          <Route path="/add-movie" element={<AddMovieForm />} />
          <Route path="/library" element={<Library library={library} handleRemoveFromLibrary={handleRemoveFromLibrary} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
