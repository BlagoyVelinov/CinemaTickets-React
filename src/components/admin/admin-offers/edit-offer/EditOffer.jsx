import { useEffect, useState } from "react";
import styles from './EditOffer.module.css';
import offerService from "../../../../services/offerService";

export default function EditOffer({ offerId, onSubmit, onCancel  }) {
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function fetchOffer() {
            try {
                const offerData = await offerService.getOfferById(offerId);
                setOffer(offerData);
            
            } catch (error) {
                console.error('Error fetching offer:', error);

            } finally {
                setLoading(false);
            }
        }
        fetchOffer();
    }, [offerId]);

    const handleChange = (e) => {
		const { name, value } = e.target;
		
        setOffer(prev => ({
            ...prev,
            [name]: value
        }));
		
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
		if(!offer.title) newErrors.title = "Title is required";
		if(!offer.imageUrl) newErrors.imageUrl = "Offer image URL is required";
		if(!offer.description) newErrors.description = "Description is required";

		setErrors(newErrors);
		if(Object.keys(newErrors).length === 0) {
			await onSubmit(offerId, offer);
		}
	};

    if (loading) return <div>Loading...</div>;
    if (!offer) return <div>Offer not found</div>;

    return (
        <div>
            <form className={styles.editOfferForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <div className={styles.labelHolder}>
                        <label htmlFor="title" className={styles.label}>Offer Title</label>
                    </div>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="title"
                        name="title"
                        value={offer.title}
                        onChange={handleChange}
                    />
                    {errors.title && <small className={styles.errorText}>{errors.title}</small>}
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
                        minLength="5" 
                        maxLength="200"
                        value={offer.imageUrl}
                        onChange={handleChange}
                    />
                    {errors.imageUrl && <small className={styles.errorText}>{errors.imageUrl}</small>}
                </div>

                <div className={styles.formGroup}>
                    <div className={styles.labelHolder}>
                        <label htmlFor="description" className={styles.label}>Description</label>
                    </div>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="description"
                        name="description"
                        minLength="5" 
                        maxLength="2000"
                        value={offer.description}
                        onChange={handleChange}
                    />
                    {errors.description && <small className={styles.errorText}>{errors.description}</small>}
                </div>

                <div className={styles.buttonHolder}>
                    <button 
                        type="submit" 
                        className={`${styles.btn} ${styles.btnSave}`} 
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