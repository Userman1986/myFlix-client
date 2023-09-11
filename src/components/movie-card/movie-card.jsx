import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import '../../dist/index.css';

export const MovieCard = ({ movie, onMovieClick, isFavorite, onToggleFavorite }) => {
  const { _id, title, imgURL, description, genre, director } = movie;

  return (
    <Card className="movie-card">
      <Card.Img variant="top" src={imgURL} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button className="btn-danger1" onClick={() => onMovieClick(movie)} variant="danger">
          Open
        </Button>
        <Button
<<<<<<< Updated upstream
          className={isFavorite ? 'btn-primary' : 'btn-secondary'} // Set button style based on favorite status
          onClick={() => onToggleFavorite(movie)} // Call the function to add/remove from favorites
=======
          className={isFavorite ? 'btn-primary' : 'btn-secondary'} 
          onClick={() => onToggleFavorite(movie)} 
>>>>>>> Stashed changes
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
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
  onMovieClick: PropTypes.func.isRequired,
<<<<<<< Updated upstream
  isFavorite: PropTypes.bool.isRequired, // Indicates if the movie is in favorites
  onToggleFavorite: PropTypes.func.isRequired, // Function to add/remove from favorites
=======
  isFavorite: PropTypes.bool.isRequired, 
  onToggleFavorite: PropTypes.func.isRequired,
>>>>>>> Stashed changes
};
