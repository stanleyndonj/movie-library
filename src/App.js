import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import MovieDetail from './components/MovieDetail';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Library from './components/Library';


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        {/* Use Routes instead of Switch and update Route components */}
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/library" element={<Library />} />
          <Route path="/add-movie" element={<AddMovieForm />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; // Don't forget to export your App component