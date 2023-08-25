export const movieCard = ({ movie, MovieClick }) => {
    return (
      <div
        onClick={() => {
          onmovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
  };