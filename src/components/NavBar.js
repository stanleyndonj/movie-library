// NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = ({ toggleTheme, searchQuery, setSearchQuery, fetchMoviesBySearch }) => {
  return (
    <div className="mainnav">
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/series">Series</NavLink>
        <NavLink to="/episodes">Episodes</NavLink>
        <NavLink to="/library">Library</NavLink>
        <NavLink to="/add-movie"><button className="addbutton">Add Movie</button></NavLink>
      </nav>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

export default NavBar;
