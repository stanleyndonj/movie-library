import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import MovieDetail from './components/MovieDetail';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Library from './components/Library';
import './App.css'; // Ensure this file handles light/dark theme styles
import SeriesList from './components/SeriesList';
import EpisodesList from './components/EpisodesList';
import Login from './components/Login';
import SignUp from './components/SignUp';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const AppContent = () => {
  const [library, setLibrary] = useState([]);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing user session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('movielib_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('movielib_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Fetch the user's movie library when user changes
  useEffect(() => {
    const fetchUserLibrary = async () => {
      if (!user) {
        setLibrary([]);
        return;
      }

      try {
        // Fetch only movies belonging to the current user
        const response = await fetch(`${API_URL}/movies?userId=${user.id}`);
        const data = await response.json();
        setLibrary(data);
      } catch (error) {
        console.error('Error fetching user library:', error);
        // Fallback to localStorage for user library
        const userLibraryKey = `movielib_library_${user.id}`;
        const storedLibrary = localStorage.getItem(userLibraryKey);
        if (storedLibrary) {
          setLibrary(JSON.parse(storedLibrary));
        }
      }
    };

    fetchUserLibrary();
  }, [user]); // Depend on user instead of empty array

  // Add movie to library (json-server)
  const handleAddToLibrary = async (movie) => {
    if (!user) {
      alert('Please log in to add movies to your library');
      return;
    }

    // Check if movie is already in user's library
    const isAlreadyInLibrary = library.some(libMovie => 
      (libMovie.imdbID && libMovie.imdbID === (movie.imdbID || movie.id)) ||
      (libMovie.title === (movie.Title || movie.title))
    );

    if (isAlreadyInLibrary) {
      alert('This movie is already in your library!');
      return;
    }

    const movieData = {
      title: movie.Title || movie.title,
      releaseDate: movie.Year || movie.releaseDate,
      poster: movie.Poster || movie.poster,
      imdbID: movie.imdbID || movie.id,
      type: movie.Type || 'movie',
      userId: user.id, // Associate with current user
      dateAdded: new Date().toISOString()
    };

    try {
      const response = await fetch(`${API_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        const newMovie = await response.json();
        setLibrary((prevLibrary) => [...prevLibrary, newMovie]);
        alert('Movie added to your library!');
        
        // Also save to localStorage as backup
        const userLibraryKey = `movielib_library_${user.id}`;
        const updatedLibrary = [...library, newMovie];
        localStorage.setItem(userLibraryKey, JSON.stringify(updatedLibrary));
      } else {
        throw new Error('Failed to add movie to library');
      }
    } catch (error) {
      console.error('Error adding movie to library:', error);
      
      // Fallback to localStorage only
      const newMovie = { ...movieData, id: Date.now() };
      setLibrary((prevLibrary) => [...prevLibrary, newMovie]);
      alert('Movie added to your library! (Offline mode)');
      
      const userLibraryKey = `movielib_library_${user.id}`;
      const updatedLibrary = [...library, newMovie];
      localStorage.setItem(userLibraryKey, JSON.stringify(updatedLibrary));
    }
  };

  // Remove movie from library (json-server)
  const handleRemoveFromLibrary = async (movieId) => {
    if (!user) {
      alert('Please log in to manage your library');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/movies/${movieId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedLibrary = library.filter((movie) => movie.imdbID !== movieId && movie.id !== movieId);
        setLibrary(updatedLibrary);
        
        // Update localStorage backup
        const userLibraryKey = `movielib_library_${user.id}`;
        localStorage.setItem(userLibraryKey, JSON.stringify(updatedLibrary));
      } else {
        throw new Error('Failed to remove movie from library');
      }
    } catch (error) {
      console.error('Error removing movie:', error);
      
      // Fallback to localStorage only
      const updatedLibrary = library.filter((movie) => movie.imdbID !== movieId && movie.id !== movieId);
      setLibrary(updatedLibrary);
      
      const userLibraryKey = `movielib_library_${user.id}`;
      localStorage.setItem(userLibraryKey, JSON.stringify(updatedLibrary));
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

  // Authentication handlers
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoading(false);
    navigate('/'); // Redirect to home page after login
  };

  const handleSignUp = (userData) => {
    setUser(userData);
    setIsLoading(false);
    navigate('/movies'); // Redirect to movies page after signup
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('movielib_user');
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="loading-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}>
        <div className="loading-spinner animate-spin" style={{
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>⭯</div>
        <p>Loading MovieLib...</p>
      </div>
    );
  }

  return (
    <div className={`App ${theme}`}>
      <NavBar
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fetchMoviesBySearch={fetchMoviesBySearch}
        user={user}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movies"
          element={
            <MovieList
              handleAddToLibrary={handleAddToLibrary}
              library={library}
              handleRemoveFromLibrary={handleRemoveFromLibrary}
            />
          }
        />
        <Route path="/add-movie" element={<AddMovieForm handleAddToLibrary={handleAddToLibrary} />} />
        <Route
          path="/library"
          element={
            <Library
              library={library}
              handleRemoveFromLibrary={handleRemoveFromLibrary}
              user={user}
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
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
