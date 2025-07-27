import { useState, useEffect } from "react";
import { useMovies } from "../../../contexts/MovieContext";
import AddMovie from "./add-movie/AddMovie";
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

    const handleSubmitMovie = (movieData) => {
        // Тук ще добавите логиката за изпращане на данните към API
        console.log('New movie data:', movieData);
        // TODO: Извикайте API за добавяне на филм
        // await addMovie(movieData);
        
        // След успешно добавяне
        setShowAddMovieForm(false);
        loadAllMovies(); // Презаредете списъка с филми
    };

    const handleCancelAdd = () => {
        setShowAddMovieForm(false);
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
                <AddMovie 
                    onSubmit={handleSubmitMovie}
                    onCancel={handleCancelAdd}
                />
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