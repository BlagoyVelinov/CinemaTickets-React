import { Routes, Route } from 'react-router';
import AdminNav from './admin-nav-links/AdminNav';
import AdminMovies from './admin-movies/AdminMovies';
import AdminOffers from './admin-offers/AdminOffers';
import AdminUsers from './admin-users/AdminUsers';
import styles from './Admin.module.css'

export default function Admin() {
    
    return(
        <div className={styles.mainScreen}>
            <h1>Admin Section</h1>
            <AdminNav />
            
            <div className={styles.adminContent}>
                <Routes>
                    <Route path="/" element={<AdminMovies />} />
                    <Route path="/movies" element={<AdminMovies />} />
                    <Route path="/offers" element={<AdminOffers />} />
                    <Route path="/users" element={<AdminUsers />} />
                </Routes>
            </div>
        </div>
    );
}