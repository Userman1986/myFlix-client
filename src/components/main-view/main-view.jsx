import { useState } from "react";movie
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      _id: "64a3ecab95727e8cf840ee02",
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and even redemption through acts of common decency.",
      genre: "Drama",
      director: "Frank Darabont",
      imgURL: "https://pics.filmaffinity.com/The_Shawshank_Redemption-576140557-large.jpg"
    },
    {
      _id: "64a3ed2195727e8cf840ee06",
      title: "The Lord of the Rings: The Return of the King",
      description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
      genre: "Adventure",
      director: "Peter Jackson",
      imgURL: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
    },
    {
      _id: "64a3ecab95727e8cf840ee03",
      title: "The Godfather",
      description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      genre: "Crime",
      director: "Francis Ford Coppola",
      imgURL: "https://static.wikia.nocookie.net/international-entertainment-project/images/9/9b/The_Godfather_-_poster_%28English%29.jpg/revision/latest?cb=20230121190704"
    },
    {
      _id: "64a3ed2195727e8cf840ee08",
      title: "The Good, the Bad and the Ugly",
      description: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
      genre: "Western",
      director: "Sergio Leone",
      imgURL: "https://static.wikia.nocookie.net/dubbing9585/images/a/a1/The_good%2C_the_bad_%26_the_ugly.jpg/revision/latest?cb=20171206011139"
    },
    {
      _id: "64a3ed2195727e8cf840ee05",
      title: "12 Angry Men",
      description: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
      genre: "Drama",
      director: "Sidney Lumet",
      imgURL: "https://static.wikia.nocookie.net/moviedatabase/images/2/2f/12_Angry_Men.jpg/revision/latest?cb=20160503195139"
    },
    {
      _id: "64a3ed2195727e8cf840ee0b",
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      genre: "Action",
      director: "Christopher Nolan",
      imgURL: "https://upload.wikimedia.org/wikipedia/en/1/18/Inception_OST.jpg"
    },
    {
      _id: "64a3ed2195727e8cf840ee04",
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      genre: "Action",
      director: "Christopher Nolan",
      imgURL: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg"
    }
  ]);


  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedmovie) {
    return (
      <movieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onmovieClick={(newSelectedMovie) => {
            setSelectedmovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
}
