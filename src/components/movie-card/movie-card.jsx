import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Add this import

import '../../dist/index.css';

export const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  const { _id, title, imgURL, description, genre, director } = movie;

  return (
    <Card className="movie-card">
      <Card.Img variant="top" src={imgURL} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Link to={`/movies/${_id}`}> {/* Use Link component */}
          <Button className="btn-danger1" variant="danger">
            Open
          </Button>
        </Link>
        <Button
          className={isFavorite ? 'btn-primary' : 'btn-secondary'}
          onClick={() => onToggleFavorite(movie)}
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
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};
