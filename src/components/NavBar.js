import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
  return (
    <div className="mainnav">
      <nav className="navbar">
        <NavLink to="/">Movies</NavLink>
        <NavLink to="/series">Series</NavLink>
        <NavLink to="/episodes">Episodes</NavLink>
        <NavLink to="/library">Library</NavLink>
      </nav>
      <div>
       <NavLink to="/add-movie"><button className="addbutton">Add Movie</button></NavLink>
      </div>
    </div>
  );
};

export default NavBar;
