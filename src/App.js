// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import MovieDetail from './components/MovieDetail';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Library from './components/Library'; // Import the Library component

function App() {
  // State to manage the library movies
  const [library, setLibrary] = useState([]);
  const [theme, setTheme] = useState('light');

  // Function to add movie to the library
  const handleAddToLibrary = (movie) => {
    setLibrary((prevLibrary) => [...prevLibrary, movie]);
  };

  // Function to toggle theme
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
          <Route path="/" element={<MovieList handleAddToLibrary={handleAddToLibrary} library={library} />} />
          <Route path="/add-movie" element={<AddMovieForm />} />
          <Route path="/library" element={<Library library={library} />} /> {/* Library route */}
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
