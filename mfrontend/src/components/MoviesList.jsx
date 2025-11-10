import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function MoviesList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchMovies = async () => {
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

    useEffect(() => {
        fetchMovies();
    }, []);

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh", // full viewport height
                    width: "100%",
                    position: "fixed", // stay above all
                    top: 0,
                    left: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.8)", // subtle overlay
                    zIndex: 1050, // ensures it appears above navbar
                }}
            >
                <div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="alert alert-danger text-center mt-4" role="alert">
                {error}
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div className="text-center mt-4">
                <h4>No movies found 🎬</h4>
                <p>Add your first movie to get started.</p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Movies List 🎥</h2>

            <div className="row">
                {movies.map((movie) => (
                    <div key={movie.imdbId} className="col-md-4 mb-3">
                        <div className="card shadow-sm">
                            <img src={movie.poster} className="card-img-top" alt={movie.title} />
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">{movie.releaseDate}</p>
                                <a href={`/movies/${movie.imdbId}`} className="btn btn-primary w-100">
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
