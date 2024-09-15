import React from 'react';


const Library = ({ library, handleRemoveFromLibrary }) => {
  return (
    <div className="library-container">
      <h2>Your Movie Library</h2>
      {library.length === 0 ? (
        <p>Your library is empty.</p>
      ) : (
        <div className="library-grid">
          {library.map((movie) => (
            <div className="movie-tile" key={movie.imdbID || movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.releaseDate}</p>
              <img src={movie.poster} alt={`${movie.title} Poster`} width="100" />
              <button
                className="remove-from-library-btn"
                onClick={() => handleRemoveFromLibrary(movie.id || movie.imdbID)}
              >
                Remove from Library
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
