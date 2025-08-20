import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useUserContext } from "../../../contexts/UserContext";
import { useUser } from "../../../api/authApi";

import styles from './HeaderUserMenu.module.css';

export default function HeaderUserMenu() {
    const { username, userLogoutHandler, admin, imageUrl } = useUserContext();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { user } = useUser();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        setShowDropdown(false);
        userLogoutHandler();
        navigate('/');
    };

    const handleClickMenu = (e) => {
        setShowDropdown(false);
    }

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
                <article className={styles.userInfo}>
                    <span>{username}</span>
                    <div className={styles.imageContainer}>
                        <img 
                            className={styles.avatarImage} 
                            src={imageUrl || user?.imageUrl || "/images/avatar.png"} 
                            alt="User avatar" 
                        />
                    </div>
                </article>
            </div>
            
                <div className={`${styles.userDropdownMenu} ${showDropdown ? styles.userDropdownMenuActive : ""}`}>
                    {admin == true && (
                        <Link to="/admin-section" className={styles.dropdownItem} onClick={handleClickMenu}>
                            <span className={styles.dropdownItemContent}>Admin Panel</span>
                        </Link>
                    )}
                    <Link to="/account/settings" className={styles.dropdownItem} onClick={handleClickMenu}>
                        <span className={styles.dropdownItemContent}>Account Settings</span>
                    </Link>
                    <button className={`${styles.dropdownItem} ${styles.logoutBtn}`} onClick={handleLogout}>
                        <span className={styles.dropdownItemContent}>Logout</span>
                    </button>
                </div>
        </div>
    );
}