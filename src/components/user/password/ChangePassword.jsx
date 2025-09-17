import { useState } from 'react';
import styles from './ChangePassword.module.css';

export default function ChangePassword({ onConfirm, onCancel, passwordChangeError, clearPasswordChangeError }) {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
        if (passwordChangeError) {
            clearPasswordChangeError();
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!passwords.currentPassword) {
            newErrors.currentPassword = "Current password is required";
        }
        if (!passwords.newPassword) {
            newErrors.newPassword = "New password is required";
        } else if (passwords.newPassword.length < 8) {
            newErrors.newPassword = "New password must be at least 8 characters long";
        }
        if (!passwords.confirmNewPassword) {
            newErrors.confirmNewPassword = "Confirm new password is required";
        } else if (passwords.newPassword !== passwords.confirmNewPassword) {
            newErrors.confirmNewPassword = "New password and confirm password do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onConfirm(passwords);
        }
    };

    return (
        <div className={styles.changePasswordForm}>
            <h3>Change Password</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={passwords.currentPassword}
                        onChange={handleChange}
                        className={errors.currentPassword || passwordChangeError ? styles.errorInput : ''}
                    />
                    {errors.currentPassword && <small className={styles.errorText}>{errors.currentPassword}</small>}
                    {passwordChangeError && <small className={styles.errorText}>{passwordChangeError}</small>}
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        className={errors.newPassword ? styles.errorInput : ''}
                    />
                    {errors.newPassword && <small className={styles.errorText}>{errors.newPassword}</small>}
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        placeholder="Confirm New Password"
                        value={passwords.confirmNewPassword}
                        onChange={handleChange}
                        className={errors.confirmNewPassword ? styles.errorInput : ''}
                    />
                    {errors.confirmNewPassword && <small className={styles.errorText}>{errors.confirmNewPassword}</small>}
                </div>
                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.confirmButton}>Confirm</button>
                </div>
            </form>
        </div>
    );
}