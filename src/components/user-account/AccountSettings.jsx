import { useState } from 'react';
import { Link } from 'react-router';
import styles from './AccountSettings.module.css';

export default function AccountSettings({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
		name: "",
        username: "",
        email: "",
        birthdate,
	});

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
		const { name, value } = e.target;
		
        setFormData(prev => ({
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
		if(!formData.name) newErrors.name = "Name is required";
		if(!formData.username) newErrors.username = "Username is required";
		if(!formData.email) newErrors.email = "Email address is required";

		setErrors(newErrors);
		if(Object.keys(newErrors).length === 0) {
			onSubmit(formData);
		}
	};
    
    return (
        <div className={styles.mainScreen}>
            <h1>Account Settings</h1>

            <div className={styles.userDetailsContainer}>
                <section className={styles.leftPart}>

                    <article className={styles.userImageSettings}>

                        <div className={styles.imageContainer}>
                            <img src="/images/avatar.png" alt="Profile Image" />
                        </div>

                        <button className={styles.addImageBtn}>
                            Upload a photo
                        </button>

                    </article>

                </section>

                <section className={styles.rightPart}>
                    <form className={styles.editUserForm} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <div className={styles.labelHolder}>
                                <label htmlFor="username" className={styles.label}>Username</label>
                            </div>
                            <input
                                type="text"
                                className={styles.formControl}
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {errors.username && <small className={styles.errorText}>{errors.username}</small>}
                        </div>

                        <div className={styles.formGroup}>
                            <div className={styles.labelHolder}>
                                <label htmlFor="name" className={styles.label}>Your Names</label>
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
                                <label htmlFor="email" className={styles.label}>Email Address</label>
                            </div>
                            <input
                                type="email"
                                className={styles.formControl}
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <small className={styles.errorText}>{errors.email}</small>}
                        </div>

                        <div className={styles.formGroup}>
                            <div className={styles.labelHolder}>
                                <label htmlFor="birthdate" className={styles.label}>Birthdate</label>
                            </div>
                            <input disabled
                                type="birthdate"
                                className={styles.formControl}
                                id="birthdate"
                                name="birthdate"
                                value={formData.birthdate}
                            />
                        </div>

                        <div className={styles.buttonHolder}>
                            <button type="submit" className={`${styles.btn} ${styles.btnAdd}`}>Save</button>
                            <button type="button" onClick={onCancel} className={`${styles.btn} ${styles.btnCancel}`}>Cancel</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}