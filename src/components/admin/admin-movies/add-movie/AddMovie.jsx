import { useState } from "react";
import styles from './AddMovie.module.css';
import movieService from "../../../../services/movieService";

export default function AddMovie({ onSubmit, onCancel }) {
	const [formData, setFormData] = useState({
		name: "",
		movieLength: "",
		audio: "",
		subtitles: "",
		description: "",
		imageUrl: "",
		trailerUrl: "",
		projectionFormat: "",
		hallNumber: "",
		movieClass: "",
		genreCategories: [],
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value, type, selectedOptions } = e.target;
		
		if (type === 'select-multiple') {
			const selectedValues = Array.from(selectedOptions).map(option => option.value);
			setFormData(prev => ({
				...prev,
				[name]: selectedValues
			}));
		} else {
			setFormData(prev => ({
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
		if(!formData.name) newErrors.name = "Name is required";
		if(!formData.movieLength) newErrors.movieLength = "Movie length is required";
		if(!formData.subtitles) newErrors.subtitles = "Subtitles are required";
		if(!formData.movieClass) newErrors.movieClass = "Class of movie is required";
		if(!formData.audio) newErrors.audio = "Audio is required";
		if(!formData.imageUrl) newErrors.imageUrl = "Image URL is required";
		if(!formData.trailerUrl) newErrors.trailerUrl = "Trailer URL is required";
		if(!formData.projectionFormat) newErrors.projectionFormat = "Projection format is required";
		if(!formData.hallNumber) newErrors.hallNumber = "Hall number is required";
		if(formData.genreCategories.length === 0) newErrors.genreCategories = "Genre of movie is required";

		setErrors(newErrors);
		if(Object.keys(newErrors).length === 0) {
			// try {
			// 	const result = await movieService.addMovie(formData);
			// 	console.log('Movie added successfully:', result);
			// 	onSubmit(result);
			// } catch (error) {
			// 	console.error('Error adding movie:', error);
			// }
			onSubmit(formData);
		}
	};

    return (
		<form className={styles.addMovieForm} onSubmit={handleSubmit}>
			<div className={styles.formGroup}>
				<div className={styles.labelHolder}>
					<label htmlFor="name" className={styles.label}>Name</label>
				</div>
				<input
					type="text"
					className={styles.formControl}
					id="name"
					name="name"
					value={formData.name}
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
					value={formData.movieLength}
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
					value={formData.audio}
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
					value={formData.subtitles}
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
					value={formData.description}
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
					value={formData.imageUrl}
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
					value={formData.trailerUrl}
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
					value={formData.projectionFormat}
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
					value={formData.movieClass}
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
					value={formData.hallNumber}
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
					value={formData.genreCategories}
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
				{formData.genreCategories.length > 0 && (
					<div className={styles.selectedGenres}>
						<small>Selected: {formData.genreCategories.join(', ')}</small>
					</div>
				)}
				{errors.genreCategories && <small className={styles.errorText}>{errors.genreCategories}</small>}
			</div>

			<div className={styles.buttonHolder}>
				<button type="submit" className={`${styles.btn} ${styles.btnAdd}`}>Add movie</button>
				<button type="button" onClick={onCancel} className={`${styles.btn} ${styles.btnCancel}`}>Cancel</button>
			</div>
		</form>
    );
}