import { useActionState, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useRegister } from "../../api/authApi";
import { UserRegister } from "../../models/UserRegister";

export default function SignUp() {
    const [errors, setErrors] = useState([]);
    const { register } = useRegister();
    const navigate = useNavigate();

    const registerHandler = async (_, formData) => {
        try {
            setErrors([]);
            
            const values = Object.fromEntries(formData);

            const userData = new UserRegister(
                values.username,
                values.email,
                values.name,
                values.birthdate,
                values.password,
                values.confirmPassword
            );

            await register(userData);
            
            // navigate('/users/login');
            navigate("/users/login?registered=1");
            
        } catch (error) {
            console.error('Registration error:', error);
            
            if (error.message) {
                setErrors([error.message]);
            } else if (error.status === 409) {
                setErrors(['Username or email already exists']);
            } else if (error.status === 400) {
                setErrors(['Invalid data provided. Please check your input.']);
            } else {
                setErrors(['Registration failed. Please try again.']);
            }
        }
    };

    const [_, registerAction, isPending] = useActionState(registerHandler, {
        username: '',
        email: '',
        name: '',
        birthdate: '',
        password: '',
        confirmPassword: ''
    });

    return (
        <>
            <div className="centered-form-container">
                <div className="wrapper wrapper-register">
                    <h2>Register</h2>
                    <form action={registerAction} className="auth-form-box">
                        {/* Error message */}
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
                                placeholder="Username" 
                                required 
                            />
                            <i className='bx bxs-user'></i>
                        </div>

                        <div className="input-box">
                            <input 
                                id="email" 
                                name="email" 
                                type="email" 
                                placeholder="Email" 
                                required 
                            />
                            <i className='bx bxs-envelope'></i>
                        </div>

                        <div className="input-box">
                            <input 
                                id="name" 
                                name="name" 
                                type="text" 
                                placeholder="Name" 
                                required 
                            />
                            <i className='bx bxs-user-detail'></i>
                        </div>

                        <div className="input-box">
                            <input 
                                id="birthdate" 
                                name="birthdate" 
                                type="date" 
                                required 
                            />
                            <i className='bx bxs-calendar'></i>
                        </div>

                        <div className="input-box">
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                placeholder="Password" 
                                required 
                            />
                            <i className='bx bxs-lock-alt'></i>
                        </div>

                        <div className="input-box">
                            <input 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                type="password" 
                                placeholder="Confirm Password" 
                                required 
                            />
                            <i className='bx bxs-lock-alt'></i>
                        </div>

                        <button 
                            type="submit" 
                            className="btn" 
                            disabled={isPending}
                        >
                            {isPending ? 'Registering...' : 'Register'}
                        </button>

                        <div className="register-link">
                            <p>Already have an account? <Link to="/users/login">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}