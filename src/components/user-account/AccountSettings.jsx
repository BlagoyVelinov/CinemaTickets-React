import { useEffect, useState } from 'react';
import styles from './AccountSettings.module.css';
import { useEditUser, useUser } from '../../api/authApi';
import { formatBirthdate } from '../../utils/formatDate';

export default function AccountSettings({ userId, onSubmit, onCancel }) {
    const { user } = useUser();
    const [profile, setProfile] = useState(null);
    const { editUserData } = useEditUser();
    const [isEditing, setIsEditing] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [initialProfile, setInitialProfile] = useState(null);

    const fieldsToCompare = ['username', 'name', 'email'];
    const isEqual = (a, b) => fieldsToCompare.every(field => (a?.[field] || '') === (b?.[field] || ''));

    useEffect(() => {
        if (user) {
            setProfile(user);
            if (!isEditing) {
                setInitialProfile(user);
            }
        }
    }, [user, isEditing]);

    const handleEdit = () => {
        setInitialProfile(profile);
        setIsEditing(true);
        setIsDirty(false);
    };
    
    const handleCancel = () => {
        setProfile(initialProfile);
        setIsEditing(false);
        setIsDirty(false);
        onCancel?.();
    };

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
		const { name, value } = e.target;
		
        setProfile(prev => {
            const next = { ...prev, [name]: value };
            setIsDirty(!isEqual(next, initialProfile));
            
            return next;
        });
		
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
		if(!profile.name) newErrors.name = "Name is required";
		if(!profile.username) newErrors.username = "Username is required";
		if(!profile.email) newErrors.email = "Email address is required";

		setErrors(newErrors);
		if(Object.keys(newErrors).length === 0) {
            if (onSubmit) {
                await onSubmit(userId, profile);
            } else {
                await editUserData(user.id, profile);
            }
            
            setInitialProfile(profile);
            setIsEditing(false);
            setIsDirty(false);
		}
	};
    
    return (
        <div className={styles.mainScreen}>
            <h1>Account Settings</h1>

            <div className={styles.userDetailsContainer}>
                <section className={styles.leftPart}>

                    <article className={styles.userImageSettings}>

                        <div className={styles.imageContainer}>
                            <img src={profile?.imageUrl || "/images/avatar.png"} 
                             alt="Profile Image" />
                        </div>

                        <button className={`${styles.btn} ${styles.addImageBtn}`}>
                            Upload a photo
                        </button>

                    </article>
                    <button className={`${styles.btn} ${styles.changePassBtn}`}>
                        Change password
                    </button>
                    <button className={`${styles.btn} ${styles.deleteBtn}`}>
                        Delete account
                    </button>

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
                                value={profile?.username || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                            {errors.username && <small className={styles.errorText}>{errors.username}</small>}
                        </div>

                        <div className={styles.formGroup}>
                            <div className={styles.labelHolder}>
                                <label htmlFor="name" className={styles.label}>Full Name</label>
                            </div>
                            <input
                                type="text"
                                className={styles.formControl}
                                id="name"
                                name="name"
                                value={profile?.name || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
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
                                value={profile?.email || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                            {errors.email && <small className={styles.errorText}>{errors.email}</small>}
                        </div>

                        <div className={styles.formGroup}>
                            <div className={styles.labelHolder}>
                                <label htmlFor="birthdate" className={styles.label}>Birthdate</label>
                            </div>
                            <input
                                type="text"
                                className={styles.formControl}
                                id="birthdate"
                                name="birthdate"
                                value={formatBirthdate(profile?.birthdate) || ''}
                                disabled
                            />
                        </div>

                        <div className={styles.buttonHolder}>
                            {!isEditing ? (
                                <button 
                                    type="button" 
                                    className={`${styles.btn} ${styles.btnAdd}`}
                                    onClick={handleEdit}
                                >
                                    Edit
                                </button>
                                
                            ) : (
                                <>
                                    <button 
                                        type="submit" 
                                        className={`${styles.btn} ${styles.btnAdd}`}
                                        disabled={!isDirty}
                                    >
                                        Save
                                    </button>

                                    <button 
                                        type="button" 
                                        className={`${styles.btn} ${styles.btnCancel}`}
                                        onClick={handleCancel} 
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}