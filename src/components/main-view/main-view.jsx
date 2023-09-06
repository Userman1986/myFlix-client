import React, { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = ({ apiUrl }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const movieFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            title: movie.title,
            description: movie.description,
            imgURL: movie.imgURL,
            director: {
              _id: movie.director._id,
              name: movie.director.name, 
            },
            genre: {
              _id: movie.genre._id, 
              name: movie.genre.name, 
            },
          };
        });

        setMovies(movieFromApi);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [apiUrl]);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
      {selectedMovie && (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default MainView;
