import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container justify-content-center">
                <Link className="navbar-brand text-center" to="/" style={{ fontSize: "1.5rem" }}>
                    🎬 MoviesApp
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
