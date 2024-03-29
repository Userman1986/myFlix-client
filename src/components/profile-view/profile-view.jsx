import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';

export const ProfileView = ({
  user,
  onUpdateUser,
  onDeregister,
  movies,
  userFavoriteMovies,
  onUpdateUserFavoriteMovies,
}) => {
  const [formData, setFormData] = useState({
    username: user.Username || '',
    password: '',
    email: user.Email || '',
    dateOfBirth: user.DateOfBirth || '',
  });

  useEffect(() => {
    if (movies && user && user.FavoriteMovies) {
      const favoriteMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie._id));
      
    }
  }, [movies, user]);

  const handleUpdate = () => {
    onUpdateUser(formData);
  };

  const handleDeregister = () => {
    onDeregister();
  };

  const onToggleFavorite = (movie) => {
    const updatedFavorites = userFavoriteMovies.filter((favMovie) => favMovie._id !== movie._id);
    onUpdateUserFavoriteMovies(updatedFavorites);
  };

  return (
    <div className="profile-view">
      <h2>Profile</h2>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="formDateOfBirth">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </Form.Group>
              </Form>
              <Button variant="primary" onClick={handleUpdate}>
                Update
              </Button>
              <Button variant="danger" onClick={handleDeregister}>
                Deregister
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h3>Favorite Movies</h3>
          <div className="favorite-movies">
            {userFavoriteMovies &&
              userFavoriteMovies.map((movie) => (
                <Card key={movie._id}>
                  <Card.Img variant="top" src={movie.imgURL} />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
                    <div className="d-flex justify-content-center">
                      <Button variant="danger" onClick={() => onToggleFavorite(movie)}>
                        Remove from Favorites
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};
