import { useState } from "react";
import { useMovies } from "../../../contexts/MovieContext";

export default function AdminMovies() {
    const { movies } = useMovies();
    const [showAddMovieForm, setShowAddMovieForm] = useState(false);

    const handleAddMovie = () => {
        setShowAddMovieForm(!showAddMovieForm);
    };

    return (
        <div className="admin-content">
            <h2>Manage Movies</h2>
            <div className="admin-controls">
                <button className="btn admin-btn-add" onClick={handleAddMovie}>
                    {showAddMovieForm ? 'Show Movies' : 'Add Movie'}
                </button>
            </div>

            {showAddMovieForm ? (
                <div className="add-movie-form">
                    <h3>Add New Movie</h3>
                    <p>Movie form will be implemented here...</p>
                </div>
            ) : (
                <div className="movies-list">
                    {movies && movies.length > 0 ? (
                        <div className="movies-grid">
                            {movies.map(movie => (
                                <div key={movie.id} className="movie-item">
                                    <h4>{movie.title}</h4>
                                    <p>{movie.description}</p>
                                    <div className="movie-actions">
                                        <button className="btn btn-edit">Edit</button>
                                        <button className="btn btn-delete">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h3 className="no-articles">No movies yet</h3>
                    )}
                </div>
            )}
        </div>
    );
}