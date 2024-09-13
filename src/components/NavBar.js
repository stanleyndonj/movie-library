// NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
  return (
    <div className="mainnav">
      <div>
        <nav className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/library">Library</NavLink> {/* Updated this NavLink */}
          <NavLink to="#">Series</NavLink>
          <NavLink to="#">Episodes</NavLink>
        </nav>
      </div>
      <div>
        <button className='addbutton'>Add Movie</button>
      </div>
    </div>
  );
};

export default NavBar;
