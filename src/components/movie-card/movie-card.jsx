import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap'; // Make sure 'Card' is imported from 'react-bootstrap'

import '../../dist/index.css';

export const MovieCard = ({ movie, onMovieClick }) => {
  const { _id, title, imgURL, description, genre, director } = movie;
  return (
    <Card className="movie-card">
      <Card.Img variant="top" src={movie.imgURL} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Button className="btn-danger1" onClick={() => onMovieClick(movie)} variant="danger">
          Open
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
};
