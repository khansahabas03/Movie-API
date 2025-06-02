import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";

function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    imdbId: "",
    releaseDate: "",
    trailerLink: "",
    poster: "",
    genres: "",
  });

  const [success, setSuccess] = useState(false);

  const fetchMovie = async () => {
    try {
      const res = await api.get(`/api/v1/movies/${id}`);
      setMovie({
        ...res.data,
        genres: res.data.genres?.join(", ") || "",
      });
    } catch (err) {
      console.error("Failed to fetch movie:", err);
    }
  };

  useEffect(() => {
    if (id) fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...movie,
      genres: movie.genres.split(",").map(g => g.trim()),
    };

    try {
      if (id) {
        await api.put(`/api/v1/movies/${movie.imdbId}`, payload);
      } else {
        if (!payload.imdbId) {
          payload.imdbId = "tt" + Math.floor(1000000 + Math.random() * 9000000);
        }
        await api.post("/api/v1/movies", payload);
      }

      // Show success message
      setSuccess(true);

      // Hide after 3 seconds and navigate
      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 3000);

    } catch (err) {
      console.error("Failed to save movie:", err);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">{id ? "Edit" : "Add"} Movie</h2>

      {success && (
        <div className="alert alert-success text-center" role="alert">
          Movie {id ? "updated" : "added"} successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={movie.title}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Title"
          required
        />
        <input
          name="imdbId"
          value={movie.imdbId}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="IMDb ID (e.g., tt1234567)"
          required={!id}
          disabled={!!id}
        />
        <input
          name="releaseDate"
          value={movie.releaseDate}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Release Date"
        />
        <input
          name="poster"
          value={movie.poster}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Poster URL"
        />
        <input
          name="trailerLink"
          value={movie.trailerLink}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Trailer URL"
        />
        <input
          name="genres"
          value={movie.genres}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="Genres (comma-separated)"
        />
        <button className="btn btn-primary">
          {id ? "Update" : "Add"} Movie
        </button>
      </form>
    </div>
  );
}

export default MovieForm;
