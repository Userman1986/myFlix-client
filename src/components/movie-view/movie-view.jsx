import React from "react";
import PropTypes from 'prop-types';
import "../../dist/index.css"; 

export const MovieView = ({ movie, onBackClick, isFavorite, onToggleFavorite }) => {
  return (
    <div className="movie-view">
      <div className="movie-header">
        <button className="back-button" onClick={onBackClick}>
          Back
        </button>
<<<<<<< Updated upstream
        
=======
        {/* Render a button to toggle favorite status */}
>>>>>>> Stashed changes
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
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    imgURL: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired, // Indicates whether the movie is a favorite
  onToggleFavorite: PropTypes.func.isRequired, // Function to toggle favorite status
};
