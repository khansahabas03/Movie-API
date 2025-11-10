import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Loader from "../components/Loader";
import "./MoviesList.css";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    setLoading(true);
    setError(""); // clear previous error

    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial fetch
  useEffect(() => {
    fetchMovies();
  }, []);

  // 🔹 Show Loader when fetching
  if (loading && !error) return <Loader message="Fetching Movies..." />;

  // 🔹 Show Error Overlay (centered, with retry)
  if (error) {
    return (
      <div className="fullscreen-error fade-in">
        <div className="error-box">
          <div className="stopped-spinner text-danger mb-3">
            <i className="bi bi-exclamation-triangle-fill"></i>
          </div>
          <h4>{error}</h4>
          <button className="btn btn-outline-light mt-3" onClick={fetchMovies}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // 🔹 No movies found
  if (movies.length === 0) {
    return (
      <div className="text-center mt-4">
        <h4>No movies found 🎬</h4>
        <p>Add your first movie to get started.</p>
      </div>
    );
  }

  // 🔹 Movie list
  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4">Movies List 🎥</h2>

      <div className="row">
        {movies.map((movie) => (
          <div key={movie.imdbId} className="col-md-4 mb-3">
            <div className="card shadow-sm">
              <img
                src={movie.poster}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.releaseDate}</p>
                <a
                  href={`/movies/${movie.imdbId}`}
                  className="btn btn-primary w-100"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
