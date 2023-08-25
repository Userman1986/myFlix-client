export const MovieCard = ({ movie, MovieClick }) => {
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