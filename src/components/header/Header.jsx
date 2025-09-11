import { useLocation } from 'react-router'
import React from 'react';

import { useUserContext } from '../../contexts/UserContext';
import HeaderLogo from './logo/HeaderLogo';
import HeaderUserMenu from './user-menu/HeaderUserMenu';
import HeaderNav from './nav-links/HeaderNav';
import HeaderLanguageSelector from './language-selector/HeaderLanguageSelector';
import HeaderAuthLinks from './auth-links/HeaderAuthLinks';
import styles from './Header.module.css';

export default function Header() {
    const location = useLocation();
    const hideNav = location.pathname === '/users/login' || location.pathname === '/users/register';
    const isOrderModal = location.pathname === '/program/order';
    const isAdminSection = location.pathname.startsWith('/admin-section');
    const isSettings = location.pathname === '/account/settings';
    const isTickets = location.pathname === '/account/tickets';
    const isOrderSuccess = location.pathname === '/order-success';
    const { username } = useUserContext();

    return (
        <header id="nav">
            <nav id="header">
                <div className="row-1">
                    <HeaderLogo />
                    <ul className={styles.topItems}>
                        {username ? <HeaderUserMenu /> : <HeaderAuthLinks />}
                        <HeaderLanguageSelector />
                    </ul>
                </div>
                {!hideNav && !isOrderModal && !isAdminSection && !isSettings && !isTickets && !isOrderSuccess && <HeaderNav />}
            </nav>
        </header>
    );
}