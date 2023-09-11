import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BrowserRouter, Routes, Route, Link, Navigate, useParams, useNavigate } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { createRoot } from 'react-dom/client';

export const MainView = ({ token, apiUrl }) => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetch(`https://guarded-hamlet-46049-f301c8b926bd.herokuapp.com/movies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((movie) => {
            return {
              _id: movie._id,
              title: movie.title,
              description: movie.description,
              imgURL: movie.imgURL,
              director: movie.director ? {
                _id: movie.director._id || '',
                name: movie.director.name || '',
              } : {},
              genre: movie.genre ? {
                _id: movie.genre._id || '',
                name: movie.genre.name || '',
              } : {},
            };
          });

          setMovies(moviesFromApi);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [token, apiUrl]);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={(user) => setUser(user)} />
                </Col>
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <ProfileView
                  user={user}
                  onUpdateUser={(updatedUser) => {
                    // Update user profile here
                  }}
                  onDeregister={() => {
                    // Handle deregister here
                  }}
                  favoriteMovies={favoriteMovies}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  {movies.length === 0 ? (
                    <div>Loading...</div>
                  ) : (
                    <MovieView
                      movie={movies.find((movie) => movie._id === params.movieId)}
                      onBackClick={() => navigate(-1)}
                      isFavorite={favoriteMovies.some((favMovie) => favMovie._id === params.movieId)}
                      onToggleFavorite={(movie) => {
                        // Handle favorite toggling
                      }}
                    />
                  )}
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col>The list is empty!</Col>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
