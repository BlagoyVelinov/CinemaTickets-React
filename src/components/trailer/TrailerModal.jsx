import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import useTrailer from "../../hooks/useTrailer";

export default function TrailerModal({ movieId, onClose }) {
    const { movie, isLoading, hasError, errorMessage } = useTrailer(movieId);
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setVisible(true);
        setTimeout(() => setShow(true), 10);
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
            navigate(-1);
          }, 100);
    };

    useEffect(() => {
        const onEscPress = (e) => {
          if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', onEscPress);
        return () => window.removeEventListener('keydown', onEscPress);
      }, []);

    if (!visible) return null;

    return (
        <div
            className={`trailer-modal${show ? ' show' : ''}`}
            onClick={e => {
                if (e.target.classList.contains('trailer-modal')) handleClose();
            }}
        >
            <div id="trailer-app" className={show ? 'show' : ''} onClick={e => e.stopPropagation()}>
                {isLoading && (
                    <div className="loading">
                        <p>Loading...</p>
                    </div>
                )}
                {hasError && (
                    <div className="error">
                        <h3>Wrong to loading</h3>
                        <p>{errorMessage}</p>
                    </div>
                )}
                {!isLoading && !hasError && movie && (
                    <div className="movie-trailer">
                        <header className="trailer-header">
                            <h3>{movie.name}</h3>
                        </header>
                        <button onClick={handleClose} className="trailer-close-button">X</button>
                        <div>
                            <iframe
                                width="780"
                                height="425"
                                src={movie.trailerUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                title="Movie Trailer"
                            ></iframe>
                        </div>
                        <p>{movie.description || "Don't have a description!"}</p>
                    </div>
                )}
                {!isLoading && !hasError && !movie && (
                    <div className="no-movies">
                        <h3>The movie is not found</h3>
                        <p>Please try with another movie or return to the <a href="/">Home page</a>.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
