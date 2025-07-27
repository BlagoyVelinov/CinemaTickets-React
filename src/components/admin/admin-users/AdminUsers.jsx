import styles from './AdminUsers.module.css';

export default function AdminUsers() {
    return (
        <div className={styles.adminContent}>
            <h2>Manage Users</h2>
            <div className={styles.adminControls}>
                <button className={`${styles.btn} ${styles.adminBtnAdd}`}>
                    Add New User
                </button>
            </div>
            <div className={styles.usersList}>
                <p>Users management will be implemented here...</p>
            </div>
        </div>
    );
} 