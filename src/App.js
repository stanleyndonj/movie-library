import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import MovieDetail from './components/MovieDetail';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        {/* Use Routes instead of Switch and update Route components */}
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/add-movie" element={<AddMovieForm />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          {/* The NotFound route should use path="*" to catch all unmatched routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
