export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          MovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
  };