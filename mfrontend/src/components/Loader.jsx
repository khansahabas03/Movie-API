import React, { useEffect } from "react";
import "./Loader.css";

function Loader({ message = "Loading..." }) {
  // 🔒 Lock scrolling while loader visible
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="cinema-loader">
      <div className="loader-content">
        <div className="spinner-border text-danger" role="status"></div>
        <h2 className="loader-title">🎬 MoviesApp</h2>
        <p className="loader-text">{message}</p>
      </div>
    </div>
  );
}

export default Loader;
