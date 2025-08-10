import React, { useState } from 'react';
import './AddMovieForm.css';

const AddMovieForm = ({ handleAddToLibrary }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    genre: '',
    director: '',
    poster: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Movie title is required';
    } else if (formData.title.length < 2) {
      newErrors.title = 'Title must be at least 2 characters long';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }
    
    if (!formData.releaseDate) {
      newErrors.releaseDate = 'Release date is required';
    }
    
    if (formData.poster && !isValidUrl(formData.poster)) {
      newErrors.poster = 'Please enter a valid URL for the poster';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSuccessMessage('');

    const newMovie = {
      title: formData.title,
      description: formData.description,
      releaseDate: formData.releaseDate,
      genre: formData.genre || 'Unknown',
      director: formData.director || 'Unknown',
      poster: formData.poster || '/api/placeholder/300/450'
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedMovie = await response.json();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        releaseDate: '',
        genre: '',
        director: '',
        poster: ''
      });
      
      setSuccessMessage(`🎉 "${addedMovie.title}" has been added to your library!`);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
      
    } catch (err) {
      setErrors({ submit: `Failed to add movie: ${err.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-movie-page">
      <div className="container">
        <div className="add-movie-content">
          {/* Header Section */}
          <div className="form-header">
            <h1 className="form-title">
              <span className="form-icon">🎬</span>
              Add New Movie
            </h1>
            <p className="form-subtitle">
              Add your favorite movies to the library and share them with the community
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="success-message">
              <span className="success-icon">✅</span>
              {successMessage}
            </div>
          )}

          {/* Form */}
          <div className="form-container">
            <form onSubmit={handleSubmit} className="movie-form">
              <div className="form-grid">
                {/* Title Field */}
                <div className="form-group">
                  <label htmlFor="title" className="form-label">
                    Movie Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`form-input focus-ring ${errors.title ? 'form-input-error' : ''}`}
                    placeholder="Enter movie title..."
                    maxLength={100}
                  />
                  {errors.title && (
                    <span className="error-text">{errors.title}</span>
                  )}
                </div>

                {/* Release Date Field */}
                <div className="form-group">
                  <label htmlFor="releaseDate" className="form-label">
                    Release Date *
                  </label>
                  <input
                    type="date"
                    id="releaseDate"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleInputChange}
                    className={`form-input focus-ring ${errors.releaseDate ? 'form-input-error' : ''}`}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.releaseDate && (
                    <span className="error-text">{errors.releaseDate}</span>
                  )}
                </div>

                {/* Genre Field */}
                <div className="form-group">
                  <label htmlFor="genre" className="form-label">
                    Genre
                  </label>
                  <select
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="form-input focus-ring"
                  >
                    <option value="">Select a genre</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Horror">Horror</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Animation">Animation</option>
                  </select>
                </div>

                {/* Director Field */}
                <div className="form-group">
                  <label htmlFor="director" className="form-label">
                    Director
                  </label>
                  <input
                    type="text"
                    id="director"
                    name="director"
                    value={formData.director}
                    onChange={handleInputChange}
                    className="form-input focus-ring"
                    placeholder="Enter director name..."
                    maxLength={50}
                  />
                </div>

                {/* Poster URL Field */}
                <div className="form-group form-group-full">
                  <label htmlFor="poster" className="form-label">
                    Poster URL
                  </label>
                  <input
                    type="url"
                    id="poster"
                    name="poster"
                    value={formData.poster}
                    onChange={handleInputChange}
                    className={`form-input focus-ring ${errors.poster ? 'form-input-error' : ''}`}
                    placeholder="https://example.com/poster.jpg"
                  />
                  {errors.poster && (
                    <span className="error-text">{errors.poster}</span>
                  )}
                  <span className="form-help">Optional: Add a poster image URL</span>
                </div>

                {/* Description Field */}
                <div className="form-group form-group-full">
                  <label htmlFor="description" className="form-label">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`form-textarea focus-ring ${errors.description ? 'form-input-error' : ''}`}
                    placeholder="Enter movie description, plot, or your review..."
                    rows={4}
                    maxLength={500}
                  />
                  <div className="textarea-footer">
                    {errors.description ? (
                      <span className="error-text">{errors.description}</span>
                    ) : (
                      <span className="form-help">
                        {formData.description.length}/500 characters
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {errors.submit}
                </div>
              )}

              {/* Submit Button */}
              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⭯</span>
                      Adding Movie...
                    </>
                  ) : (
                    <>
                      <span>🎬</span>
                      Add Movie
                    </>
                  )}
                </button>
              </div>
      </form>
          </div>

          {/* Help Text */}
          <div className="form-footer">
            <p className="form-help">
              * Required fields. Make sure all information is accurate before submitting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieForm;
