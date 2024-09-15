// components/Slideshow.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slideshow = ({ movies }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      <Slider {...settings}>
        {movies.map(movie => (
          <div key={movie.imdbID || movie.id}> {/* Use a unique key */}
            <img src={movie.poster || movie.Poster} alt={movie.title || movie.Title} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;
