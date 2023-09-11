import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BrowserRouter, Routes, Route, Link, Navigate, useParams } from 'react-router-dom'; 
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';

export const MainView = ({ propToken, apiUrl }) => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [showSignup, setShowSignup] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (token) {
      localStorage.setItem('user', user);
      localStorage.setItem('token', token);

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
  }, [token, apiUrl, user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const handleSignup = () => {
   
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const handleMovieCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={user ? (
              <ProfileView
                user={user}
                onUpdateUser={(updatedUser) => {
                  // Handle user profile update
                }}
                onDeregister={() => {
                  // Handle user deregistration
                }}
                favoriteMovies={favoriteMovies}
              />
            ) : (
              <Navigate to="/login" replace />
            )}
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
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
                          // Handle favorite movie toggle
                        }}
                      />
                    )}
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    {movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <>
                        {movies.map((movie) => (
                          <Col className="mb-4" key={movie._id} md={3}>
                            <Link to={`/movies/${movie._id}`}>
                              <MovieCard
                                movie={movie}
                                onMovieClick={(selectedMovie) => navigate(`/movies/${selectedMovie._id}`)}
                                isFavorite={favoriteMovies.some((favMovie) => favMovie._id === movie._id)}
                                onToggleFavorite={(movie) => {
                                  // Handle favorite movie toggle
                                }}
                              />
                            </Link>
                          </Col>
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
