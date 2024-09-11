import React from 'react';
import { Link } from 'react-router-dom';

// Home Component
const Home = () => {
  return (
    <div>
      <h1>Movie Library</h1>
      <nav>
        <Link to="/add-movie">Add a New Movie</Link>
      </nav>
    </div>
  );
};

export default Home;
