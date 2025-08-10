// components/Slideshow.js
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slideshow.css';

const Slideshow = ({ movies }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Get featured movies (first 5 for slideshow)
  const featuredMovies = movies.slice(0, 5);

  // Function to get high quality poster or fallback for slideshow
  const getHighQualityPoster = (posterUrl, title = '') => {
    if (!posterUrl || posterUrl === 'N/A') {
      return `https://via.placeholder.com/800x400/6366f1/ffffff?text=${encodeURIComponent((title || 'Featured').slice(0, 30))}`;
    }
    
    // Get higher resolution for slideshow (wider aspect ratio)
    let highQualityUrl = posterUrl;
    if (posterUrl.includes('SX300')) {
      highQualityUrl = posterUrl.replace('SX300', 'SX800');
    } else if (posterUrl.includes('._V1_')) {
      highQualityUrl = posterUrl.replace('._V1_', '._V1_SX800_CR0,0,800,400_');
    }
    
    return highQualityUrl;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: isPlaying,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    customPaging: (i) => (
      <div className="custom-dot">
        <span className={`dot-indicator ${i === currentSlide ? 'active' : ''}`}></span>
      </div>
    ),
    appendDots: dots => (
      <div className="custom-dots-container">
        <ul className="custom-dots"> {dots} </ul>
      </div>
    ),
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  if (!featuredMovies.length) return null;

  return (
    <div className="slideshow-container">
      <div className="slideshow-header">
        <h3 className="slideshow-title">Featured Movies</h3>
        <div className="slideshow-controls">
          <button
            className={`control-btn ${isPlaying ? 'playing' : 'paused'}`}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>
      
      <div className="modern-slideshow">
        <Slider {...settings}>
          {featuredMovies.map((movie, index) => (
            <div key={movie.imdbID || movie.id} className="slide-item">
              <div className="slide-content">
                <div className="slide-image-container">
                  <img 
                    src={getHighQualityPoster(movie.Poster || movie.poster, movie.Title || movie.title)} 
                    alt={movie.Title || movie.title}
                    className="slide-image"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/800x400/6366f1/ffffff?text=${encodeURIComponent((movie.Title || movie.title || 'Featured').slice(0, 30))}`;
                    }}
                  />
                  <div className="slide-overlay">
                    <div className="slide-info">
                      <h3 className="slide-title">
                        {movie.Title || movie.title}
                      </h3>
                      <p className="slide-year">
                        {movie.Year || movie.releaseDate}
                      </p>
                      {movie.Plot && (
                        <p className="slide-plot">
                          {movie.Plot.length > 120 
                            ? `${movie.Plot.substring(0, 120)}...` 
                            : movie.Plot
                          }
                        </p>
                      )}
                      {movie.Type && (
                        <span className="slide-type-badge">
                          {movie.Type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        
        {/* Progress indicator */}
        <div className="slide-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${((currentSlide + 1) / featuredMovies.length) * 100}%` 
              }}
            />
          </div>
          <span className="progress-text">
            {currentSlide + 1} / {featuredMovies.length}
          </span>
        </div>
      </div>
    </div>
  );
};

// Custom Arrow Components
const CustomPrevArrow = ({ onClick }) => (
  <button className="slide-arrow slide-arrow-prev" onClick={onClick}>
    <span className="arrow-icon">‹</span>
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className="slide-arrow slide-arrow-next" onClick={onClick}>
    <span className="arrow-icon">›</span>
  </button>
);

export default Slideshow;
