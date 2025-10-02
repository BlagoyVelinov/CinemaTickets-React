import { useState } from "react";
import { Link, NavLink } from "react-router";

export default function HeaderNav() {
    const [showDropdown, setShowDropdown] = useState(false);
    
    const toggleMenu = () => {
        setShowDropdown((prev) => !prev);
    }
    
    return (
        <div className="row-2" data-show-tabs="true">
            <ul className={showDropdown ? "mobile-nav-active" : ""}>
                <li>
                    <NavLink to="/" onClick={toggleMenu} style={({ isActive }) => isActive ? {color: 'green'} : {}}
                    >
                        Home
                    </NavLink></li>
                <li><NavLink to="/program" onClick={toggleMenu}>Program</NavLink></li>
                <li><NavLink to="/offers" onClick={toggleMenu}>Offers</NavLink></li>
                <li><NavLink to="/4dx" onClick={toggleMenu}>4-DX</NavLink></li>
                <li className="last"><NavLink to="/imax" onClick={toggleMenu}>IMAX</NavLink></li>
            </ul>
            <Link className="icon-menu" onClick={toggleMenu}>
                <i className="fa fa-bars"></i>
            </Link>
        </div>
    );
}