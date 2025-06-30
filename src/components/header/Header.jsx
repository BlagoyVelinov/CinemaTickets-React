import { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router'
import { UserContext } from '../../contexts/UserContext';

export default function Header() {
    const location = useLocation();
    const hideNav = location.pathname === '/users/login' || location.pathname === '/users/register';
    const { username } = useContext(UserContext);

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
                                    <form method="post">
                                        <input type="submit" className="btn btn-info btn-logout" value="Logout" />
                                    </form>
                                </div>
                            )
                            : (
                                // <ul>
                                <div>
                                    <li><Link to="/users/login"><img src="/images/login-icon.gif" alt="login" /></Link></li>
                                    <li><Link to="/users/register"><img src="/images/signup-green3.gif" alt="register" /></Link></li>
                                    </div>
                                // </ul>
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
                {!hideNav && (
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