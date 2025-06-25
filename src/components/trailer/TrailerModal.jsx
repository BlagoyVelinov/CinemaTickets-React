import { useState, useEffect } from "react";
import useTrailer from "../../hooks/useTrailer";

export default function TrailerModal({ movieId, onClose }) {
    const { movie, isLoading, hasError, errorMessage } = useTrailer(movieId);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    useEffect(() => {
        console.log("TrailerModal movie:", movie);
    }, [movie]);

    return (
        <div className="trailer-modal show">
            <div id="trailer-app" className="show">
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
                        <button onClick={() => {
                            console.log("TrailerModal close button clicked");
                            setShow(false);
                            setTimeout(onClose, 300);
                        }} className="trailer-close-button">×</button>
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