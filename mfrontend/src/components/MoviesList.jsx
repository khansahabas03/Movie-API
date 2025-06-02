import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";

function MoviesList() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");

    const getMovies = async () => {
        try {
            const response = await api.get("/api/v1/movies");
            setMovies(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h2>Movies</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title..."
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Link to="/add-movie" className="btn btn-success mb-3">Add Movie</Link>
            {filtered.map((movie) => (
                <div className="card mb-2" key={movie.id}>
                    <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <p className="card-text">Released: {movie.releaseDate}</p>
                        <Link to={`/movies/${movie.imdbId}`} className="btn btn-primary me-2">Details</Link>
                        <Link to={`/edit-movie/${movie.imdbId}`} className="btn btn-warning">Edit</Link>

                    </div>
                </div>
            ))}
        </div>
    );
}

export default MoviesList;
