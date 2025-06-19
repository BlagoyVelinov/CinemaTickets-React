import { Link } from "react-router";


export default function Login() {

 return (
    <>
        <div className="wrapper">
            <h2>Login</h2>

            <form id="login-form" action="#" className="auth-form-box">
                {/* <!-- Error message --> */}
                <small className="text-danger" style={{display: "none"}}>Incorrect username or password!</small>

                <div className="input-box">
                    <input id="username" name="username" type="text" min="2" max="50" placeholder="Username" required />
                    <i className='bx bxs-user'></i>
                </div>

                <div className="input-box">
                    <input id="password" name="password" type="password" min="2" max="20" placeholder="Password" required />
                    <i className='bx bxs-lock-alt'></i>
                </div>

                <div className="remember-me">
                    <label><input type="checkbox" name="rememberMe" /> Remember Me</label>
                </div>

                <button type="submit" className="btn">Login</button>

                <div className="register-link">
                    <p>Don't have an account? <Link to="/users/register">Register</Link></p>
                </div>
            </form>
        </div>
    </>
  );
}