import React, { useState } from 'react';
import './AddMovieForm.css'; // Custom styling for the form

const AddMovieForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovie = {
      title,
      description,
      releaseDate,
    };

    try {
      const response = await fetch('http://localhost:8000/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) throw new Error('Failed to add movie');

      setTitle('');
      setDescription('');
      setReleaseDate('');
      alert('Movie added successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="add-movie-container">
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        
        <label>Release Date:</label>
        <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
        
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
