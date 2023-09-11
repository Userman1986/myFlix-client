import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import "../../dist/index.css"; 

export const MovieView = ({ movies, user, token, favoriteMovies, navigate }) => {
  const { movieId } = useParams(); 
  const movie = movies.find((movie) => movie._id === movieId); 

  
  if (!movie) {
    return <div>Movie not found.</div>;
  }

  const isFavorite = favoriteMovies.some((favMovie) => favMovie._id === movie._id);

  return (
    <div className="movie-view">
      <div className="movie-header">
        <Link to="/">
          <button className="back-button">
            Back
          </button>
        </Link>
        
        <button className="favorite-button" onClick={() => onToggleFavorite(movie)}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
      <div className="movie-content">
        <div className="movie-poster">
          <img src={movie.imgURL} alt={movie.title} />
        </div>
        <div className="movie-details">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-description">{movie.description}</p>
          <div className="movie-meta">
            <p className="movie-genre">Genre: {movie.genre.name}</p>
            <p className="movie-director">Director: {movie.director.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  favoriteMovies: PropTypes.array,
  navigate: PropTypes.func.isRequired, // Pass navigate function
};
