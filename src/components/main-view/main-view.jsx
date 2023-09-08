import React, { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import SignupView from '../signup-view/signup-view';
import { Row, Col, Container, Button } from "react-bootstrap";
import "../../dist/index.css";

export const MainView = ({ apiUrl }) => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [showSignup, setShowSignup] = useState(false);
<<<<<<< HEAD
  const [expandedMovie, setExpandedMovie] = useState(null); // Track expanded movie
=======
  const [expandedMovie, setExpandedMovie] = useState(null);
>>>>>>> parent of b9d9434 (6543)

  useEffect(() => {
    if (token) {
      localStorage.setItem('user', user);
      localStorage.setItem('token', token);

      fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const movieFromApi = data.map((movie) => {
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

          setMovies(movieFromApi);
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
<<<<<<< HEAD
    setSelectedMovie(movie); 
=======
    setExpandedMovie(movie); 
>>>>>>> parent of b9d9434 (6543)
  };

  const handleBackClick = () => {
    setExpandedMovie(null);
  };

  return (
    <Container>
      {user ? (
        <div>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
          <Row>
            {movies.map((movie) => (
              <Col key={movie._id} sm={6} md={4} lg={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={() => handleMovieCardClick(movie)}
                />
              </Col>
            ))}
          </Row>
<<<<<<< HEAD
          {selectedMovie && (
  <MovieView
    movie={selectedMovie}
    onBackClick={handleBackClick}
  />
)}
=======
          {expandedMovie && (
            <MovieView
              movie={expandedMovie}
              onBackClick={handleBackClick}
            />
          )}
>>>>>>> parent of b9d9434 (6543)
        </div>
      ) : (
        <div className="login-container">
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <div className="signup-form">
            {showSignup ? (
              <SignupView onSignup={handleSignup} />
            ) : (
              <Button className="signup-button" onClick={toggleSignup}>
                Signup
              </Button>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};
