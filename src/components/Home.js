import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: '🔍',
      title: 'Discover Movies',
      description: 'Search through thousands of movies from our extensive database powered by OMDb API.'
    },
    {
      icon: '📚',
      title: 'Build Your Library',
      description: 'Create your personal movie collection and keep track of your favorite films.'
    },
    {
      icon: '🎬',
      title: 'Add Custom Movies',
      description: 'Can\'t find a movie? Add your own entries with custom details and descriptions.'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Enjoy your movie library on any device - desktop, tablet, or mobile.'
    },
    {
      icon: '🌓',
      title: 'Dark Mode',
      description: 'Switch between light and dark themes for comfortable viewing any time.'
    },
    {
      icon: '⚡',
      title: 'Fast & Modern',
      description: 'Built with React and modern web technologies for lightning-fast performance.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Movies Available' },
    { number: '500+', label: 'Happy Users' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Access' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-pattern"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Your Personal 
              <span className="hero-highlight"> Movie Library</span>
            </h1>
            <p className="hero-subtitle">
              Discover, collect, and organize your favorite movies in one beautiful, 
              easy-to-use platform. Start building your cinematic journey today.
            </p>
            <div className="hero-actions">
              <Link to="/add-movie" className="btn btn-primary btn-lg hero-cta">
                <span>🎬</span>
                Start Your Collection
              </Link>
              <Link to="/library" className="btn btn-secondary btn-lg">
                <span>📚</span>
                View Library
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-cards">
              <div className="hero-card hero-card-1">
                <img src="/api/placeholder/200/300" alt="Movie Poster 1" />
              </div>
              <div className="hero-card hero-card-2">
                <img src="/api/placeholder/200/300" alt="Movie Poster 2" />
              </div>
              <div className="hero-card hero-card-3">
                <img src="/api/placeholder/200/300" alt="Movie Poster 3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose MovieLib?</h2>
            <p className="section-subtitle">
              Everything you need to manage and enjoy your movie collection
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Movie Journey?</h2>
            <p className="cta-subtitle">
              Join thousands of movie enthusiasts who trust MovieLib to organize their collections.
            </p>
            <div className="cta-actions">
              <Link to="/add-movie" className="btn btn-primary btn-lg">
                <span>🚀</span>
                Get Started Now
              </Link>
              <Link to="/movies" className="btn btn-secondary btn-lg">
                <span>🎭</span>
                Browse Movies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3 className="footer-title">
                <span>🎬</span>
                MovieLib
              </h3>
              <p className="footer-description">
                Your personal movie library management system.
              </p>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h4 className="footer-section-title">Quick Links</h4>
                <ul className="footer-list">
                  <li><Link to="/movies">Browse Movies</Link></li>
                  <li><Link to="/library">My Library</Link></li>
                  <li><Link to="/add-movie">Add Movie</Link></li>
                  <li><Link to="/series">TV Series</Link></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4 className="footer-section-title">Features</h4>
                <ul className="footer-list">
                  <li>Movie Search</li>
                  <li>Personal Library</li>
                  <li>Dark Mode</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 MovieLib. Built with ❤️ for movie lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
