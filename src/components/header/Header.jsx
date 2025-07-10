import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { useUserContext } from '../../contexts/UserContext';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const hideNav = location.pathname === '/users/login' || location.pathname === '/users/register';
    const isOrderModal = location.pathname === '/program/order';

    const { username, userLogoutHandler } = useUserContext();

    const handleLogout = (e) => {
        e.preventDefault();
        userLogoutHandler();
        navigate('/');
    };

    return (
        <header id="nav">
            <nav id="header">
                <div className="row-1">
                    <div className="fleft"><Link to="/">Cinema <span>Tickets</span></Link></div>
                    <ul>
                        {username 
                            ? (
                                <div className="form-inline my-2 my-lg-0 border px-3 welcome-message">
                                    <div className="logged-user">
                                        <span>{username}</span>
                                    </div>
                                    <button className="btn btn-info btn-logout" onClick={handleLogout}>Logout</button>
                                </div>
                            )
                            : (
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
                            )
                        }

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
                {!hideNav && !isOrderModal && (
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
                  </div>
                )}
            </nav>
        </header>
    );
}