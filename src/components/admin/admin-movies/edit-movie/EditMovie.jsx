import { useEffect, useState } from "react";
import movieService from "../../../../services/movieService";
import styles from './EditMovie.module.css';
import { formatBookingTime } from "../../../../utils/formatBookingTimes";

export default function EditMovie({ movieId, onSubmit, onCancel  }) {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function fetchMovie() {
            try {
                const movieData = await movieService.getMovieById(movieId);
                setMovie(movieData);
            
            } catch (error) {
                console.error('Error fetching movie:', error);

            } finally {
                setLoading(false);
            }
        }
        fetchMovie();
    }, [movieId]);

    const handleChange = (e) => {
		const { name, value, type, selectedOptions } = e.target;
		
		if (type === 'select-multiple') {
			const selectedValues = Array.from(selectedOptions).map(option => option.value);
			setMovie(prev => ({
				...prev,
				[name]: selectedValues
			}));
		} else {
			setMovie(prev => ({
				...prev,
				[name]: value
			}));
		}
		
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: ""
			}));
		}
	};

    const handleSubmit = async (e) => {
		e.preventDefault();

		const newErrors = {};
		if(!movie.name) newErrors.name = "Name is required";
		if(!movie.movieLength) newErrors.movieLength = "Movie length is required";
		if(!movie.subtitles) newErrors.subtitles = "Subtitles are required";
		if(!movie.movieClass) newErrors.movieClass = "Class of movie is required";
		if(!movie.audio) newErrors.audio = "Audio is required";
		if(!movie.imageUrl) newErrors.imageUrl = "Image URL is required";
		if(!movie.trailerUrl) newErrors.trailerUrl = "Trailer URL is required";
		if(!movie.projectionFormat) newErrors.projectionFormat = "Projection format is required";
		if(!movie.hallNumber) newErrors.hallNumber = "Hall number is required";
		if(movie.genreCategories.length === 0) newErrors.genreCategories = "Genre of movie is required";

		setErrors(newErrors);
		if(Object.keys(newErrors).length === 0) {
            const movieToSend = { ...movie };
            movieToSend.bookingTimes = movie.bookingTimes.map(formatBookingTime);
			await onSubmit(movieId, movieToSend);
		}
	};

    if (loading) return <div>Loading...</div>;
    if (!movie) return <div>Movie not found</div>;

    return (
        <div>
            <form className={styles.editMovieForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <div className={styles.labelHolder}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                    </div>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="name"
                        name="name"
                        value={movie.name}
                        onChange={handleChange}
                    />
                    {errors.name && <small className={styles.errorText}>{errors.name}</small>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.labelHolder}>
                        <label htmlFor="movieLength" className={styles.label}>Movie Length</label>
                    </div>
                    <input
                        type="number"
                        className={styles.formControl}
                        id="movieLength"
                        name="movieLength"
                        min="20" 
                        max="180"
                        value={movie.movieLength}
                        onChange={handleChange}
                    />
                    {errors.movieLength && <small className={styles.errorText}>{errors.movieLength}</small>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.labelHolder}>
                        <label htmlFor="audio" className={styles.label}>Audio</label>
                    </div>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="audio"
                        name="audio"
                        minLength="2" 
                        maxLength="20"
                        value={movie.audio}
                        onChange={handleChange}
                    />
                    {errors.audio && <small className={styles.errorText}>{errors.audio}</small>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.labelHolder}>
                        <label htmlFor="subtitles" className={styles.label}>Subtitles</label>
                    </div>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="subtitles"
                        name="subtitles"
                        minLength="2" 
                        maxLength="20"
                        value={movie.subtitles}
                        onChange={handleChange}
                    />
                    {errors.subtitles && <small className={styles.errorText}>{errors.subtitles}</small>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.labelHolder}>
                        <label htmlFor="description" className={styles.label}>Description</label>
                    </div>
                    <textarea
                        className={styles.formControl}
                        id="description"
                        name="description"
                        minLength="5" 
                        maxLength="250"
                        value={movie.description}
                        onChange={handleChange}
                    />	
                    {errors.description && <small className={styles.errorText}>{errors.description}</small>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.labelHolder}>
                        <label htmlFor="imageUrl" className={styles.label}>Image URL</label>
                    </div>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="imageUrl"
                        name="imageUrl"
                        minLength="10"
                        value={movie.imageUrl}
                        onChange={handleChange}
                    />	
                    {errors.imageUrl && <small className={styles.errorText}>{errors.imageUrl}</small>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.labelHolder}>
                        <label htmlFor="trailerUrl" className={styles.label}>Trailer URL</label>
                    </div>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="trailerUrl"
                        name="trailerUrl"
                        minLength="10"
                        placeholder="https://www.youtube.com/embed/..."
                        value={movie.trailerUrl}
                        onChange={handleChange}
                    />	
                    {errors.trailerUrl && <small className={styles.errorText}>{errors.trailerUrl}</small>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.labelHolder}>
                        <label htmlFor="projectionFormat" className={styles.label}>Projection Format</label>
                    </div>
                    <select
                        className={styles.formControl}
                        name="projectionFormat"
                        id="projectionFormat"
                        value={movie.projectionFormat}
                        onChange={handleChange}
                    >
                        <option value="">Select Projection Format</option>
                        <option value="D_2D">2D</option>
                        <option value="D_3D">3D</option>
                        <option value="D_4DX">4DX</option>
                    </select>
                    {errors.projectionFormat && <small className={styles.errorText}>{errors.projectionFormat}</small>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.labelHolder}>
                        <label htmlFor="movieClass" className={styles.label}>Class Of Movie</label>
                    </div>
                    <select
                        className={styles.formControl}
                        name="movieClass"
                        id="movieClass"
                        value={movie.movieClass}
                        onChange={handleChange}
                    >
                        <option value="">Select Class Movie</option>
                        <option value="B_">B</option>
                        <option value="C_">C</option>
                        <option value="C_PLUS">C+</option>
                        <option value="D_">D</option>
                        <option value="X_">X</option>
                        <option value="TBC">?</option>
                    </select>
                    {errors.movieClass && <small className={styles.errorText}>{errors.movieClass}</small>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.labelHolder}>
                        <label htmlFor="hallNumber" className={styles.label}>Hall Number</label>
                    </div>
                    <select
                        className={styles.formControl}
                        name="hallNumber"
                        id="hallNumber"
                        value={movie.hallNumber}
                        onChange={handleChange}
                    >
                        <option value="">Select Hall Number</option>
                        <option value="HALL_1">1</option>
                        <option value="HALL_2">2</option>
                        <option value="HALL_3">3</option>
                        <option value="HALL_4">4</option>
                        <option value="HALL_5">5</option>
                        <option value="HALL_6">6</option>
                        <option value="HALL_7">7</option>
                        <option value="HALL_8">8</option>
                    </select>
                    {errors.hallNumber && <small className={styles.errorText}>{errors.hallNumber}</small>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.labelHolder}>
                        <label htmlFor="genreCategories" className={styles.label}>Genre Of Movie</label>
                    </div>
                    <select
                        className={styles.formControl}
                        name="genreCategories"
                        id="genreCategories"
                        multiple
                        value={movie.genreCategories}
                        onChange={handleChange}
                    >
                        <option value="ACTION">Action</option>
                        <option value="ADVENTURE">Adventure</option>
                        <option value="ANIMATION">Animation</option>
                        <option value="BULGARIAN">Bulgarian</option>
                        <option value="COMEDY">Comedy</option>
                        <option value="FAMILY">Family</option>
                        <option value="FANTASY">Fantasy</option>
                        <option value="HORROR">Horror</option>
                        <option value="MYSTERY">Mystery</option>
                        <option value="ROMANTIC">Romantic</option>
                        <option value="THRILLER">Thriller</option>
                    </select>
                    {movie.genreCategories.length > 0 && (
                        <div className={styles.selectedGenres}>
                            <small>Selected: {movie.genreCategories.join(', ')}</small>
                        </div>
                    )}
                    {errors.genreCategories && <small className={styles.errorText}>{errors.genreCategories}</small>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.labelHolder}>
                        <label htmlFor="bookingTimes" className={styles.label}>Booking Times</label>
                    </div>

                    <select 
                        className={styles.formControl} 
                        name="bookingTimes" 
                        id="bookingTimes"
                        multiple
                        value={movie.bookingTimes}
                        onChange={handleChange}
                    >
                        <option value="">Select booking time</option>
                        <option value="_10_20">10:20</option>
                        <option value="_11_50">11:50</option>
                        <option value="_12_20">12:20</option>
                        <option value="_13_50">13:50</option>
                        <option value="_14_20">14:20</option>
                        <option value="_15_50">15:50</option>
                        <option value="_16_20">16:20</option>
                        <option value="_17_50">17:50</option>
                        <option value="_18_20">18:20</option>
                        <option value="_19_50">19:50</option>
                        <option value="_20_20">20:20</option>
                        <option value="_20_50">20:50</option>
                    </select>
                    {movie.bookingTimes.length > 0 && (
                        <div className={styles.selectedBookingTimes}>
                            <small>Selected: {movie.bookingTimes
                                .map((bookingTime) => formatBookingTime(bookingTime))
                                .join(', ')}
                            </small>
                        </div>
                    )}
                </div>
                <div className={styles.buttonHolder}>
                    <button 
                        type="submit" 
                        className={`${styles.btn} ${styles.btnEdit}`} 
                    >
                        Save
                        </button>
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        className={`${styles.btn} ${styles.btnCancel}`}
                    >
                        Cancel
                        </button>
                </div>
            </form>
        </div>
    );
}