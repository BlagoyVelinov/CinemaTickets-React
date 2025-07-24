import { useLocation, useNavigate } from 'react-router'
import React from 'react';

import { useUserContext } from '../../contexts/UserContext';
import HeaderLogo from './logo/HeaderLogo';
import HeaderUserMenu from './user-menu/HeaderUserMenu';
import HeaderNav from './nav-links/HeaderNav';
import HeaderLanguageSelector from './language-selector/HeaderLanguageSelector';
import HeaderAuthLinks from './auth-links/HeaderAuthLinks';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const hideNav = location.pathname === '/users/login' || location.pathname === '/users/register';
    const isOrderModal = location.pathname === '/program/order';
    const { username } = useUserContext();

    return (
        <header id="nav">
            <nav id="header">
                <div className="row-1">
                    <HeaderLogo />
                    <ul>
                        {username ? <HeaderUserMenu /> : <HeaderAuthLinks />}
                        <HeaderLanguageSelector />
                    </ul>
                </div>
                {!hideNav && !isOrderModal && <HeaderNav />}
            </nav>
        </header>
    );
}