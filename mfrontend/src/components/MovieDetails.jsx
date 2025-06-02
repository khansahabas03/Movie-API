import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    const getMovie = async () => {
        try {
            const res = await api.get(`/api/v1/movies/${id}`);
            setMovie(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/api/v1/movies/${imdbId}`);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getMovie();
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div>
            <h2>{movie.title}</h2>
            <img src={movie.poster} alt={movie.title} className="img-fluid mb-3" />
            <p>Release Date: {movie.releaseDate}</p>
            <p>Genres: {movie.genres?.join(", ")}</p>
            <a href={movie.trailerLink} target="_blank" rel="noreferrer">Watch Trailer</a>
            <br />
            <button onClick={handleDelete} className="btn btn-danger mt-3">Delete</button>
        </div>
    );
}

export default MovieDetails;
