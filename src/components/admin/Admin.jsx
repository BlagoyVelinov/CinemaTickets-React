import { Routes, Route, Navigate } from 'react-router';
import AdminNav from './admin-nav-links/AdminNav';
import AdminMovies from './admin-movies/AdminMovies';
import AdminOffers from './admin-offers/AdminOffers';
import AdminUsers from './admin-users/AdminUsers';
import styles from './Admin.module.css'
import { useAllUsers } from '../../api/authApi';

export default function Admin() {
    const { users, loading, error, fetchAllUsers } = useAllUsers();
    
    return(
        <div className={styles.mainScreen}>
            <h1>Admin Section</h1>
            <AdminNav />
            
            <div className={styles.adminContent}>
                <Routes>
                    <Route path="/" element={<Navigate to="movies" replace />} />
                    <Route path="/movies" element={<AdminMovies />} />
                    <Route path="/offers" element={<AdminOffers />} />
                    <Route path="/users" element={    
                        <AdminUsers
                            users={users}
                            loading={loading}
                            error={error}
                            fetchAllUsers={fetchAllUsers}
                        />
                    } />
                </Routes>
            </div>
        </div>
    );
}