import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useUserContext } from "../../../contexts/UserContext";

import styles from '../Header.module.css';

export default function HeaderUserMenu() {
    const { username, userLogoutHandler, admin } = useUserContext();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        userLogoutHandler();
        navigate('/');
    };

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setShowDropdown(false);
    }, [username]);

    return (
        <div className={styles.userDropdownWrapper} ref={dropdownRef}>
            <div
                className="logged-user"
                onClick={() => setShowDropdown((prev) => !prev)}
                style={{ cursor: "pointer" }}
            >
                <span>{username}</span>
            </div>
            
                <div className={`${styles.userDropdownMenu} ${showDropdown ? styles.userDropdownMenuActive : ""}`}>
                    {admin == true && (
                        <Link to="/admin-section" className={styles.dropdownItem}>Admin Panel</Link>
                    )}
                    <Link to="/account/settings" className={styles.dropdownItem}>Account Settings</Link>
                    <button className={`${styles.dropdownItem} ${styles.logoutBtn}`} onClick={handleLogout}>Logout</button>
                </div>
        </div>
    );
}