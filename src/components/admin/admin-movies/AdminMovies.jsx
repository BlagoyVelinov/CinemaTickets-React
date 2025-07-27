import { useState, useEffect } from "react";
import { useMovies } from "../../../contexts/MovieContext";
import styles from './AdminMovies.module.css';

export default function AdminMovies() {
    const { allMovies, loadAllMovies } = useMovies();
    const [showAddMovieForm, setShowAddMovieForm] = useState(false);

    useEffect(() => {
        loadAllMovies();
    }, [loadAllMovies]);
    

    const handleAddMovie = () => {
        setShowAddMovieForm(!showAddMovieForm);
    };

    return (
        <div className={styles.adminContent}>
            <h2>Manage Movies</h2>
            <div className={styles.adminControls}>
                <button className={`${styles.btn} ${styles.adminBtnAdd}`} onClick={handleAddMovie}>
                    {showAddMovieForm ? 'Show Movies' : 'Add Movie'}
                </button>
            </div>

            {showAddMovieForm ? (
                <div className={styles.addMovieForm}>
                    <h3>Add New Movie</h3>
                    <p>Movie form will be implemented here...</p>
                </div>
            ) : (
                <div className={styles.moviesList}>
                    {allMovies && allMovies.length > 0 ? (
                        <div className={styles.moviesGrid}>
                            {allMovies.map(movie => (
                                <div key={movie.id} className={styles.movieItem}>
                                    <h4>{movie.name}</h4>
                                    <p>{movie.description}</p>
                                    <div className={styles.movieActions}>
                                        <button className={`${styles.btn} ${styles.btnEdit}`}>Edit</button>
                                        <button className={`${styles.btn} ${styles.btnDelete}`}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h3 className={styles.noArticles}>No movies yet</h3>
                    )}
                </div>
            )}
        </div>
    );
}