import { useActionState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";


export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();

    const loginHandler = async (_, formData) => {
        const values = Object.fromEntries(formData);

        const authData = await login(values.username, values.password);
        
        userLoginHandler(authData);

        navigate('/')

    };

    const [_, loginAction, isPending] = useActionState(loginHandler, {username: '', password: ''});

 return (
    <>
        <div className="centered-form-container">
            <div className="wrapper wrapper-login">
                <h2>Login</h2>

                <form id="login-form" action={loginAction} className="auth-form-box">
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

                    <button type="submit" className="btn" disabled={isPending}>Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <Link to="/users/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </>
  );
}