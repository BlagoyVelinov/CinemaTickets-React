import { useState, useEffect } from "react";
import { useMovies } from "../../../contexts/MovieContext";
import AddMovie from "./add-movie/AddMovie";
import styles from './AdminMovies.module.css';
import movieService from "../../../services/movieService";
import EditMovie from "./edit-movie/EditMovie";

export default function AdminMovies() {
    const { allMovies, loadAllMovies, refreshAllMovies, refreshPremieres } = useMovies();
    const [showAddMovieForm, setShowAddMovieForm] = useState(false);
    const [showEditMovieForm, setShowEditMovieForm] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        loadAllMovies();
    }, [loadAllMovies]);
    

    const handleAddMovie = () => {
        setShowAddMovieForm(!showAddMovieForm);
    };

    const handleEditMovie = (movieId) => {
            setSelectedMovie(movieId);
            setShowEditMovieForm(true);
            setShowAddMovieForm(false);
            
    };

    const handleDeleteMovie = async (movieId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
        if(!confirmDelete) return;
        
        try {
            await movieService.deleteMovie(movieId);

            await refreshAllMovies();
            console.log('Movie deleted successfully');
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    const handleSubmitMovie = async (movieData) => {
      try {
        await movieService.addMovie(movieData);

        setShowAddMovieForm(false);

        await refreshAllMovies();
        console.log('Movie added successfully');
      } catch (error) {
        console.error('Error adding movie:', error);
      }  
    };

    const handleSubmitEditMovie = async (movieId, movieData) => {
        try {
            await movieService.editMovie(movieId, movieData);
            
            setShowEditMovieForm(false);
            setSelectedMovie(null);
            
            await refreshAllMovies();
            await refreshPremieres();

            console.log('Movie updated successfully!');
        } catch (error) {
            console.error('Error editing movie: ', error);
            
        }
    };

    const handleCancelAdd = () => {
        setShowAddMovieForm(false);
    };
    
    const handleCancelEdit = () => {
        setShowEditMovieForm(false);
        setSelectedMovie(null);
    }

    return (
        <div className={styles.adminContent}>
            {showEditMovieForm ? (
                <h2>Edit Movie</h2>
                ) : showAddMovieForm ? (
                <h2>Add Movie</h2>
                ) : (
                <h2>Manage Movies</h2>
                )}
            
            
            {!showEditMovieForm && 
                <div className={styles.adminControls}>
                    <button className={`${styles.btn} ${styles.adminBtnAdd}`} 
                    onClick={handleAddMovie}
                    >
                        {showAddMovieForm ? 'Show Movies' : 'Add Movie'}
                    </button>
                </div>
            }

            {showEditMovieForm ? (
                <EditMovie
                    movieId={selectedMovie}
                    onSubmit={handleSubmitEditMovie}
                    onCancel={handleCancelEdit}
                />
            ) : showAddMovieForm ? (
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
                                        <button className={`${styles.btn} ${styles.btnEdit}`} 
                                        onClick={() => handleEditMovie(movie.id)}
                                        >
                                            Edit
                                        </button>
                                        <button className={`${styles.btn} ${styles.btnDelete}`} 
                                        onClick={() => handleDeleteMovie(movie.id)}
                                        >
                                            Delete
                                        </button>
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