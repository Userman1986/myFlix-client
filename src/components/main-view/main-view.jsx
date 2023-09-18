import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { LoginView } from '../login-view/login-view';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { MovieView } from '../movie-view/movie-view';
import SignupView from '../signup-view/signup-view';

export const MainView = ({ propToken, apiUrl }) => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [showSignup, setShowSignup] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedDirector, setSelectedDirector] = useState('');

  const handleToggleFavorite = async (e, movie) => {
    e.preventDefault();
    const isFavorite = favoriteMovies.some((favMovie) => favMovie._id === movie._id);

    let updatedFavoriteMovies = [...favoriteMovies];

    if (isFavorite) {
      updatedFavoriteMovies = updatedFavoriteMovies.filter((favMovie) => favMovie._id !== movie._id);
    } else {
      updatedFavoriteMovies.push(movie);
    }

    const fav_ids = updatedFavoriteMovies.map((fav) => fav._id);

    if (user && user._id) {
      try {
        const response = await fetch(
          `https://guarded-hamlet-46049-f301c8b926bd.herokuapp.com/users/${user._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ favoriteMovies: fav_ids }),
          }
        );

        if (response.ok) {
          setFavoriteMovies(updatedFavoriteMovies);
          console.log('User favorite movies updated successfully in the database.');
        } else {
          console.error('Failed to update user favorite movies in the database.');
        }
      } catch (error) {
        console.error('Error updating user favorite movies in the database:', error);
      }
    }
  };

  useEffect(() => {
    if (token && movies.length > 0) {
      fetch(`https://guarded-hamlet-46049-f301c8b926bd.herokuapp.com/users/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setFavoriteMovies(movies.filter((movie) => res.FavoriteMovies.includes(movie._id)));
        });
    }
  }, [movies]);

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
              director: movie.director
                ? {
                    _id: movie.director._id || '',
                    name: movie.director.name || '',
                  }
                : {},
              genre: movie.genre
                ? {
                    _id: movie.genre._id || '',
                    name: movie.genre.name || '',
                  }
                : {},
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
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  const handleUpdateUser = async (updatedUserData) => {
    console.log('Updating user with data:', updatedUserData);
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

  const handleDeregisterUser = async () => {
    const deregisterEndpoint = `https://guarded-hamlet-46049-f301c8b926bd.herokuapp.com/users/${user._id}`;

    try {
      const response = await fetch(deregisterEndpoint, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('User account deregistered successfully.');
      } else {
        console.error('Failed to deregister user account. HTTP Status:', response.status);
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error deregistering user account:', error);
    }
  };

  const handleSignup = () => {};

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const filteredMovies = movies
    .filter((movie) => {
      if (selectedGenre && selectedGenre !== 'All') {
        return movie.genre.name === selectedGenre;
      }
      return true;
    })
    .filter((movie) => {
      if (selectedDirector && selectedDirector !== 'All') {
        return movie.director.name === selectedDirector;
      }
      return true;
    });

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <div className="filters">
        <label htmlFor="genreFilter">Filter by Genre:</label>
        <select
          id="genreFilter"
          onChange={(e) => setSelectedGenre(e.target.value)}
          value={selectedGenre}
        >
          <option value="All">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          {/* Add more genre options here */}
        </select>

        <label htmlFor="directorFilter">Filter by Director:</label>
        <select
          id="directorFilter"
          onChange={(e) => setSelectedDirector(e.target.value)}
          value={selectedDirector}
        >
          <option value="All">All Directors</option>
          <option value="Director 1">Director 1</option>
          <option value="Director 2">Director 2</option>
          {/* Add more director options here */}
        </select>
      </div>
      <Row className="justify-content-md-center">
        <Routes>
          {/* ... Routes for login, profile, movies/:movieId, signup ... */}
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    {filteredMovies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <>
                        {filteredMovies.map((movie) => (
                          <Col className="mb-4" key={movie._id} md={3}>
                            <Link to={`/movies/${movie._id}`} className="movie-card">
                              <MovieCard
                                movie={movie}
                                isFavorite={favoriteMovies.some(
                                  (favMovie) => favMovie._id === movie._id
                                )}
                                onToggleFavorite={(e) => handleToggleFavorite(e, movie)}
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
