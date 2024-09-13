import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

const NavBar = () => {
  return (
    <div className="mainnav">
      <div>
        <input className='search' placeholder='Search Movies' />
      </div>
      <div>
        <nav className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/library">Movies</NavLink> {/* Updated the link */}
          <NavLink to="#">Series</NavLink>
          <NavLink to="#">Episodes</NavLink>
        </nav>
      </div>
      <div>
        <button className='addbutton'>
          <NavLink to="/add-movie" style={{ color: 'white' }}>Add Movie</NavLink>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
