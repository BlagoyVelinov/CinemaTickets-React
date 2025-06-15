import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header id="nav">
            <nav id="header">
                <div className="row-1">
                    <div className="fleft"><Link to="/">Cinema <span>Tickets</span></Link></div>
                    <ul>
                    <div className="form-inline my-2 my-lg-0 border px-3 welcome-message">
                        <div className="logged-user">
                        <span>Welcome, User</span>
                        </div>
                        <form method="post" action="/api/users/logout">
                        <input type="submit" className="btn btn-info btn-logout" value="Logout" />
                        </form>
                    </div>

                    <li><Link to="/users/login"><img src="/images/login-icon.gif" alt="login" /></Link></li>

                    <li><Link to="/users/register"><img src="/images/signup-green3.gif" alt="register" /></Link></li>
                    <li className="nav-item">
                        <form className="language" method="get">
                        <label className="text-white" htmlFor="lang">Language</label>
                        <select className="item-lang" id="lang" name="lang" onChange={(e) => e.target.form.submit()}>
                            <option value="en_US">En</option>
                            <option value="bg_BG">Бг</option>
                        </select>
                        </form>
                    </li>
                    </ul>
                </div>
                <div className="row-2" data-show-tabs="true">
                    <ul>
                    <li><Link to="/" className="active">Home</Link></li>
                    <li><Link to="/program">Program</Link></li>
                    <li><Link to="/offers">Offers</Link></li>
                    <li><Link to="/4dx">4-DX</Link></li>
                    <li className="last"><Link to="/imax">IMAX</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}