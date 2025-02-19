import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (query) => {
    setLoading(true);
    setError(""); // Reset error on new search
    try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=70d99aa1&s=${query}`
        );
        const data = await response.json();

        if (data.Response === "True") {
            // Fetch detailed info for each movie to get `imdbRating`
            const moviesWithRatings = await Promise.all(
                data.Search.map(async (movie) => {
                    const detailsResponse = await fetch(
                        `https://www.omdbapi.com/?apikey=70d99aa1&i=${movie.imdbID}`
                    );
                    const detailsData = await detailsResponse.json();
                    return { ...movie, imdbRating: detailsData.imdbRating };
                })
            );

            setMovies(moviesWithRatings);
        } else {
            setMovies([]);
            setError("No movies found. Try a different search.");
        }
    } catch (error) {
        setError("Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="home">
      <h1>🎬 Movie Search App</h1>
      <SearchBar onSearch={fetchMovies} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;