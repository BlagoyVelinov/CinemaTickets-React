import { NavLink } from 'react-router';
import styles from './AdminNav.module.css'

export default function AdminNav() {
    return (
        <div>
            <ul className={styles.adminNavUl}>
                <li className={styles.adminNavItem}><NavLink to="/admin-section/movies">Movies</NavLink></li>
                <li className={styles.adminNavItem}><NavLink to="/admin-section/offers">Offers</NavLink></li>
                <li className={styles.adminNavItem}><NavLink to="/admin-section/users">Users</NavLink></li>
            </ul>
        </div>
    );
}