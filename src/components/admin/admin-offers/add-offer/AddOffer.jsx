import { useState } from "react";
import styles from './AddOffer.module.css';

export default function AddOffer({ onSubmit, onCancel }) {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		imageUrl: "",
		offerCategory: ""
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		
			setFormData(prev => ({
				...prev,
				[name]: value
			}));

		
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
		if(!formData.title) newErrors.title = "Offer Title is required";
		if(!formData.description) newErrors.description = "Offer description is required";
		if(!formData.imageUrl) newErrors.imageUrl = "Image URL for offer is required";
		if(!formData.offerCategory) newErrors.offerCategory = "Offer Category is required";

		setErrors(newErrors);
		if(Object.keys(newErrors).length === 0) {
			onSubmit(formData);
		}
	};

    return (
		<form className={styles.addOfferForm} onSubmit={handleSubmit}>
			<div className={styles.formGroup}>
				<div className={styles.labelHolder}>
					<label htmlFor="title" className={styles.label}>Offer Title</label>
				</div>
				<input
					type="text"
					className={styles.formControl}
					id="title"
					name="title"
					value={formData.title}
					onChange={handleChange}
				/>
				{errors.title && <small className={styles.errorText}>{errors.title}</small>}
			</div>


			<div className={styles.formGroup}>
				<div className={styles.labelHolder}>
					<label htmlFor="description" className={styles.label}>Offer Description</label>
				</div>
				<textarea
					className={styles.formControl}
					id="description"
					name="description"
					minLength="5" 
					maxLength="2000"
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
                    maxLength="200"
					value={formData.imageUrl}
					onChange={handleChange}
				/>	
				{errors.imageUrl && <small className={styles.errorText}>{errors.imageUrl}</small>}
			</div>

			<div className={styles.formGroup}>
				<div className={styles.labelHolder}>
					<label htmlFor="offerCategory" className={styles.label}>Category</label>
				</div>
				<select
					className={styles.formControl}
					name="offerCategory"
					id="offerCategory"
					value={formData.offerCategory}
					onChange={handleChange}
				>
					<option value="">Select offer category</option>
                    <option value="CINEMA_OFFERS">Cinema Offers</option>
                    <option value="FOR_THE_SCHOOLS">For the schools</option>
                    <option value="FOR_THE_BUSINESS">For the business</option>
				</select>
				{errors.offerCategory && <small className={styles.errorText}>{errors.offerCategory}</small>}
			</div>

			<div className={styles.buttonHolder}>
				<button type="submit" className={`${styles.btn} ${styles.btnAdd}`}>Add offer</button>
				<button type="button" onClick={onCancel} className={`${styles.btn} ${styles.btnCancel}`}>Cancel</button>
			</div>
		</form>
    );
}