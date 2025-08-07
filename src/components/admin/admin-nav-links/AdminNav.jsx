import { NavLink } from 'react-router';
import styles from './AdminNav.module.css'

export default function AdminNav() {
    return (
        <div>
            <ul className={styles.adminNavUl}>
                <li className={styles.adminNavItem}><NavLink 
                    to="/admin-section/movies"
                    className={({ isActive }) => isActive 
                        ? `${styles.active}` 
                        : ""}
                >
                    Movies
                    </NavLink></li>
                <li className={styles.adminNavItem}><NavLink 
                    to="/admin-section/offers"
                    className={({ isActive }) => isActive 
                        ? `${styles.active}` 
                        : ""}
                >
                    Offers
                    </NavLink></li>
                <li className={styles.adminNavItem}><NavLink 
                    to="/admin-section/users"
                    className={({ isActive }) => isActive 
                        ? `${styles.active}` 
                        : ""}
                >
                    Users
                    </NavLink></li>
            </ul>
        </div>
    );
}