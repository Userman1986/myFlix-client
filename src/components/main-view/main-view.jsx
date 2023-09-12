import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { LoginView } from '../login-view/login-view';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BrowserRouter, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { MovieView } from '../movie-view/movie-view';

export const MainView = ({ propToken, apiUrl }) => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || null));
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [showSignup, setShowSignup] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const params = useParams();

  const handleToggleFavorite = (movie) => {
    const isFavorite = favoriteMovies.some((favMovie) => favMovie._id === movie._id);

    if (isFavorite) {
      const updatedFavorites = favoriteMovies.filter((favMovie) => favMovie._id !== movie._id);
      setFavoriteMovies(updatedFavorites);
    } else {
      setFavoriteMovies([...favoriteMovies, movie]);
    }
  };

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
  }, [token, apiUrl, user]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };




  const handleUpdateUser = async (updatedUserData) => {
    if (!user || !user._id || !token) {
      console.error('User or token is missing.');
      return;
    }
  
    const updateUserEndpoint = `https://guarded-hamlet-46049-f301c8b926bd.herokuapp.com/users/${user._id}`;
  
    try {
      const response = await fetch(updateUserEndpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserData),
      });
  
      if (response.ok) {
        console.log('User data updated successfully.');
      } else {
        console.error('Failed to update user data.');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
    
  

  const handleDeregisterUser = () => {
    const deregisterEndpoint = `https://guarded-hamlet-46049-f301c8b926bd.herokuapp.com/users/${user._id}`;

    fetch(deregisterEndpoint, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('User account deregistered successfully.');
        } else {
          console.error('Failed to deregister user account.');
        }
      })
      .catch((error) => {
        console.error('Error deregistering user account:', error);
      });
  };

  const handleSignup = () => {};

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  useEffect(() => {
    if (token && user && user._id) { 
      fetch(`https://guarded-hamlet-46049-f301c8b926bd.herokuapp.com/users/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [token, user]);




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
                        localStorage.setItem('user', JSON.stringify(user));
                        localStorage.setItem('token', token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <ProfileView
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  onDeregister={handleDeregisterUser}
                  movies={movies}
                  favoriteMovies={favoriteMovies}
                  onUpdateFavoriteMovies={setFavoriteMovies}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <MovieView
                movies={movies}
                user={user}
                token={token}
                favoriteMovies={favoriteMovies}
                onToggleFavorite={handleToggleFavorite}
              />
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
                                isFavorite={favoriteMovies.some((favMovie) => favMovie._id === movie._id)}
                                onToggleFavorite={handleToggleFavorite}
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