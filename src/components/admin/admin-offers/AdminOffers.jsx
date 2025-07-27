import styles from './AdminOffers.module.css';

export default function AdminOffers() {
    return (
        <div className={styles.adminContent}>
            <h2>Manage Offers</h2>
            <div className={styles.adminControls}>
                <button className={`${styles.btn} ${styles.adminBtnAdd}`}>
                    Add New Offer
                </button>
            </div>
            <div className={styles.offersList}>
                <p>Offers management will be implemented here...</p>
            </div>
        </div>
    );
} 