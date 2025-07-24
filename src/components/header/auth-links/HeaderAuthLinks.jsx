import { Link, useLocation } from "react-router-dom";

export default function HeaderAuthLinks() {
    const location = useLocation();
    return (
        <div>
            {location.pathname !== '/users/login' && (
                <li>
                    <Link to="/users/login">
                        <img src="/images/login-icon.gif" alt="login" />
                    </Link>
                </li>
            )}
            {location.pathname !== '/users/register' && (
                <li>
                    <Link to="/users/register">
                        <img src="/images/signup-green3.gif" alt="register" />
                    </Link>
                </li>
            )}
        </div>
    );
}