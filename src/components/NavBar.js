// NavBar.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = ({ toggleTheme, searchQuery, setSearchQuery, fetchMoviesBySearch, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-container ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-content">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <NavLink to="/" className="brand-link">
            <span className="brand-icon">🎬</span>
            <span className="brand-text">MovieLib</span>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <span className="nav-icon">🏠</span>
            Home
          </NavLink>
          <NavLink 
            to="/movies" 
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <span className="nav-icon">🎬</span>
            Movies
          </NavLink>
          <NavLink 
            to="/series" 
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <span className="nav-icon">📺</span>
            Series
          </NavLink>
          <NavLink 
            to="/episodes" 
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <span className="nav-icon">🎞️</span>
            Episodes
          </NavLink>
          <NavLink 
            to="/library" 
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <span className="nav-icon">📚</span>
            Library
          </NavLink>
          <NavLink 
            to="/add-movie" 
            className="nav-link nav-cta"
          >
            <span className="nav-icon">➕</span>
            Add Movie
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="navbar-actions">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            <span className="theme-icon">🌓</span>
          </button>

          {/* User Authentication */}
          {user ? (
            <div className="user-menu">
              <div className="user-profile">
                <img 
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
                  alt={user.name}
                  className="user-avatar"
                />
                <span className="user-name">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="logout-btn"
                aria-label="Logout"
              >
                <span>🚪</span>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <NavLink to="/login" className="auth-btn login-btn">
                <span>🔐</span>
                Login
              </NavLink>
              <NavLink to="/signup" className="auth-btn signup-btn">
                <span>🎯</span>
                Sign Up
              </NavLink>
            </div>
          )}

          {/* Mobile menu button */}
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}>
        <div className="mobile-nav-content">
          <NavLink 
            to="/" 
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">🏠</span>
            Home
          </NavLink>
          <NavLink 
            to="/movies" 
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">🎬</span>
            Movies
          </NavLink>
          <NavLink 
            to="/series" 
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">📺</span>
            Series
          </NavLink>
          <NavLink 
            to="/episodes" 
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">🎞️</span>
            Episodes
          </NavLink>
          <NavLink 
            to="/library" 
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">📚</span>
            Library
          </NavLink>
          <NavLink 
            to="/add-movie" 
            className="mobile-nav-link mobile-nav-cta"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="nav-icon">➕</span>
            Add Movie
          </NavLink>

          {/* Mobile Auth Actions */}
          <div className="mobile-auth-section">
            {user ? (
              <div className="mobile-user-menu">
                <div className="mobile-user-profile">
                  <img 
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
                    alt={user.name}
                    className="mobile-user-avatar"
                  />
                  <span className="mobile-user-name">Welcome, {user.name}!</span>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="mobile-logout-btn"
                >
                  <span className="nav-icon">🚪</span>
                  Logout
                </button>
              </div>
            ) : (
              <div className="mobile-auth-buttons">
                <NavLink 
                  to="/login" 
                  className="mobile-nav-link mobile-login-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="nav-icon">🔐</span>
                  Login
                </NavLink>
                <NavLink 
                  to="/signup" 
                  className="mobile-nav-link mobile-signup-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="nav-icon">🎯</span>
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-nav-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default NavBar;
