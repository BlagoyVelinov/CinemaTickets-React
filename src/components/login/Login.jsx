import { useActionState, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";
import RegistrationSuccessModal from "../common/RegistrationSuccessModal";

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useUserContext();
    const { login } = useLogin();
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const loginHandler = async (_, formData) => {
        try {
            setErrors([]);
            
            const values = Object.fromEntries(formData);

            if (!values.username || !values.password) {
                setErrors(['Username and password are required']);
                return;
            }

            const authData = await login(values.username, values.password);
            
            userLoginHandler(authData);
            localStorage.setItem("accessToken", authData.accessToken);
            // navigate(-1);
            navigate("/");
            
        } catch (error) {
            console.error('Login error:', error);

            if (error.message) {
                setErrors([error.message]);
            } else if (error.status === 401) {
                setErrors(['Incorrect username or password']);
            } else if (error.status === 403) {
                setErrors(['Access denied. Please check your credentials']);
            } else {
                setErrors(['Login failed. Please try again.']);
            }
        }
    };

    const [_, loginAction, isPending] = useActionState(loginHandler, {username: '', password: ''});

    useState(() => {
        const params = new URLSearchParams(location.search);
        if(params.get("registered") === "1") {
            setShowModal(true);
            navigate("/users/login", { replace: true });
        }
    }, [location, navigate]);
    return (
        <>
        <RegistrationSuccessModal open={showModal} onClose={() => setShowModal(false)} />
            <div className="centered-form-container">
                <div className="wrapper wrapper-login">
                    <h2>Login</h2>

                    <form id="login-form" action={loginAction} className="auth-form-box">

                        {errors.length > 0 && (
                            <div className="alert alert-danger" role="alert">
                                {errors.map((error, index) => (
                                    <div key={index}>{error}</div>
                                ))}
                            </div>
                        )}

                        <div className="input-box">
                            <input 
                                id="username" 
                                name="username" 
                                type="text" 
                                min="2" 
                                max="50" 
                                placeholder="Username" 
                                required 
                            />
                            <i className='bx bxs-user'></i>
                        </div>

                        <div className="input-box">
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                min="2" 
                                max="20" 
                                placeholder="Password" 
                                required 
                            />
                            <i className='bx bxs-lock-alt'></i>
                        </div>

                        <div className="remember-me">
                            <label><input type="checkbox" name="rememberMe" /> Remember Me</label>
                        </div>

                        <button 
                            type="submit" 
                            className="btn" 
                            disabled={isPending}
                        >
                            {isPending ? 'Logging in...' : 'Login'}
                        </button>

                        <div className="register-link">
                            <p>Don't have an account? <Link to="/users/register">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}