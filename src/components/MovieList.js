// src/components/MovieList.js
import React, { useState, useEffect } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]); // state to hold the list of movies
  const [currentPage, setCurrentPage] = useState(1); // state for pagination
  const [moviesPerPage] = useState(5); // how many movies to display per page
  const [error, setError] = useState(''); // state to handle any errors

  const API_KEY = '9e92c4e4'; // Replace with your actual OMDb API key
  const SEARCH_QUERY = 'Batman'; // You can replace this with a search query or make it dynamic

  useEffect(() => {
    // Fetch movies from the OMDb API when component mounts
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?s=${SEARCH_QUERY}&apikey=${API_KEY}`);
        const data = await response.json();
        if (data.Response === "True") {
          setMovies(data.Search); // Assuming data.Search contains the list of movies
        } else {
          setError(data.Error);
        }
      } catch (error) {
        setError('Error fetching movies');
      }
    };

    fetchMovies();
  }, []);

  // Logic for displaying current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Function to handle pagination click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Movie List</h2>
      {error && <p>{error}</p>}
      <ul>
        {currentMovies.map(movie => (
          <li key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={`${movie.Title} Poster`} width="100" />
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div>
        {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
