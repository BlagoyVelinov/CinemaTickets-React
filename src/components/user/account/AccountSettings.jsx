import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";

import styles from './AccountSettings.module.css';
import { useDeleteUser, useEditUser, useUser } from '../../../api/authApi';
import { formatBirthdate } from '../../../utils/formatDate';
import ProfileImagePickerModal from '../image-picker/ProfileImagePickerModal';
import ImageService from '../../../services/imageService';
import { useUserContext } from '../../../contexts/UserContext';

export default function AccountSettings({ userId, onSubmit, onCancel, onAdmin }) {
    const { user } = useUser(userId);
    const { userPatchAuthData } = useUserContext();
    const [profile, setProfile] = useState(null);
    const { editUserData } = useEditUser();
    const { deleteUser } = useDeleteUser();
    const [isEditing, setIsEditing] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [initialProfile, setInitialProfile] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const navigate = useNavigate();

    const fieldsToCompare = ['username', 'name', 'email'];
    const isEqual = (a, b) => fieldsToCompare.every(field => (a?.[field] || '') === (b?.[field] || ''));

    useEffect(() => {
        if (user) {
            setProfile(user);
            if (!isEditing) {
                setInitialProfile(user);
            }
        }
    }, [user]);

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

    const handleBack = () => navigate(-1);

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

    const handleOpenImageModal = () => setIsImageModalOpen(true);
    const handleCloseImageModal = () => setIsImageModalOpen(false);

    const handleConfirmImageSelection = async ({ type, value }) => {
        if (!user?.id) return;
        if (type === 'preset') {
            const result = await ImageService.setProfilePhotoFromPreset(user.id, value, profile?.deleteHash);
            if (result?.url !== undefined) {
                setProfile(prev => ({ ...prev, imageUrl: result.url, deleteHash: result.deleteHash || null }));
                setInitialProfile(prev => ({ ...prev, imageUrl: result.url, deleteHash: result.deleteHash || null }));
                userPatchAuthData?.({ imageUrl: result.url });
                setIsImageModalOpen(false);
            }
        } else if (type === 'file') {
            const result = await ImageService.updateProfilePhoto(value, user.id, profile?.deleteHash);
            if (result?.url !== undefined) {
                setProfile(prev => ({ ...prev, imageUrl: result.url, deleteHash: result.deleteHash || null }));
                setInitialProfile(prev => ({ ...prev, imageUrl: result.url, deleteHash: result.deleteHash || null }));
                userPatchAuthData?.({ imageUrl: result.url });
                setIsImageModalOpen(false);
            }
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
			try {
				let updated;
				if (onSubmit) {
					updated = await onSubmit(userId, profile);
				} else {
					updated = await editUserData(user.id, profile);
				}
				if (updated) {
					setProfile(updated);
					setInitialProfile(updated);
				} else {
					setInitialProfile(profile);
				}
				setIsEditing(false);
				setIsDirty(false);
			} catch (submitError) {
				console.error(submitError);
			}
		}
	};

    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete account on ${profile?.username}?`);
        if(!confirmDelete) return;
        
        try {
            await deleteUser(userId);

            setSelectedUserId(null);

            await fetchAllUsers();
            console.log('Deleted account successfully');
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };
    
    return (
        <div className={styles.mainScreen}>
            <h1>Account Settings</h1>

            <div className={styles.userDetailsContainer}>
                <button className={styles.xBtn} onClick={handleBack}>
                    <img src="/images/icons/arrow-ios-back.svg" alt="arrow-back" />
                </button>
                <section className={styles.leftPart}>

                    <article className={styles.userImageSettings}>

                        <div className={styles.imageContainer}>
                            <img src={profile?.imageUrl || "/images/avatar.png"} 
                             alt="Profile Image" />
                        </div>

                        <button className={`${styles.btn} ${styles.addImageBtn}`} onClick={handleOpenImageModal} type="button">
                            Upload photo
                        </button>

                    </article>
                    {!onAdmin 
                    ?   <button className={`${styles.btn} ${styles.changePassBtn}`}>
                            Change password
                        </button> 
                    : null }
                    
                    {!onAdmin 
                    ?   <button 
                            className={`${styles.btn} ${styles.deleteBtn}`}
                            onClick={() => handleDeleteUser(profile?.id)}
                        >
                            Delete account
                        </button>
                    : null}
                    

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
                                    className={`${styles.btn} ${styles.btnEdit}`}
                                    onClick={handleEdit}
                                >
                                    Edit
                                </button>
                                
                            ) : (
                                <>
                                    <button 
                                        type="submit" 
                                        className={`${styles.btn} ${styles.btnSave}`}
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
            <ProfileImagePickerModal
                isOpen={isImageModalOpen}
                onClose={handleCloseImageModal}
                onConfirm={handleConfirmImageSelection}
                currentImageUrl={profile?.imageUrl}
            />
        </div>
    );
}