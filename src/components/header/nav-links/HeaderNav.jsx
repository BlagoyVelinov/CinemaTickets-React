import { useState } from "react";
import { Link, NavLink } from "react-router";

export default function HeaderNav() {
    const [showDropdown, setShowDropdown] = useState(false);
    
    const dropdownMenu = (e) => {
        setShowDropdown(false);
    }
    
    return (
        <div className="row-2" data-show-tabs="true">
            <ul>
                <li>
                    <NavLink to="/" style={({ isActive }) => isActive ? {color: 'green'} : {}}
                    >
                        Home
                    </NavLink></li>
                <li><NavLink to="/program">Program</NavLink></li>
                <li><NavLink to="/offers">Offers</NavLink></li>
                <li><NavLink to="/4dx">4-DX</NavLink></li>
                <li className="last"><NavLink to="/imax">IMAX</NavLink></li>
            </ul>
            <Link className="icon-menu" onClick={dropdownMenu}>
                <i className="fa fa-bars"></i>
            </Link>
        </div>
    );
}