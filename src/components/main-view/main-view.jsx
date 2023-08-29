import React, { useState } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { useState, useEffect } from "react";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://guarded-hamlet-46049-f301c8b926bd.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const movieFromApi = data.docs.map((doc) => {
          return {
            id: movie._id,
            title: movie.title,
            description: movie.description,
            image: movie.imgURL,
            director: movie.director,
            genre: movie.genre
          };
        });

        setMovie(movieFromApi);
      });
  }, []);



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
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
}
