import React from 'react';
import { useLocation } from 'react-router-dom';

export const Filters = ({
  selectedGenre,
  setSelectedGenre,
  selectedDirector,
  setSelectedDirector,
}) => {
  const location = useLocation();

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleDirectorChange = (e) => {
    setSelectedDirector(e.target.value);
  };

  if (location.pathname !== '/') return null;

  return (
    <div className="filters">
      <label htmlFor="genreFilter">Genre:</label>
      <select
        id="genreFilter"
        onChange={handleGenreChange}
        value={selectedGenre}
      >
        <option value="All">All Genres</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Horror">Horror</option>
        <option value="Comedy">Comedy</option>
        <option value="Adventure">Adventure</option>
        <option value="Thriller">Thriller</option>
        <option value="Fantasy">Fantasy</option>
      </select>

      <label htmlFor="directorFilter" style={{ marginLeft: '5px' }}>
        Director:
      </label>
      <select
        id="directorFilter"
        onChange={handleDirectorChange}
        value={selectedDirector}
      >
        <option value="All">All Directors</option>
        <option value="Quentin Tarantino">Quentin Tarantino</option>
        <option value="Director 2">Director 2</option>
      </select>
    </div>
  );
};
