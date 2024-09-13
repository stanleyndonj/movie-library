import React, { useState } from 'react';

const AddMovieForm = () => {
  // State variables to manage form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovie = {
      title,
      description,
      releaseDate,
    };

    try {
      // Making POST request to the backend to add a new movie
      const response = await fetch('http://localhost:8000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        throw new Error('Failed to add movie');
      }

      // Clearing the form on success
      setTitle('');
      setDescription('');
      setReleaseDate('');
      alert('Movie added successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      {/* Form for adding a new movie */}
      <form onSubmit={handleSubmit}>
        <label>Movie Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Release Date:</label>
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
