const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>⭐ {movie.imdbRating || "N/A"}</p> {/* imdbRating will now be available */}
    </div>
  );
};

export default MovieCard;