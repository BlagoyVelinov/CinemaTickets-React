import { Link } from "react-router";

export default function SignUp() {
 return (
    <>
        <div className="centered-form-container">
            <div className="wrapper wrapper-register">
                <h2>Register</h2>
                <form method="post" action="/users/register" className="auth-form-box">
                {/* <!-- Error message --> */}
                    <small className="text-danger" style={{display: "none"}}>Registration error!</small>

                    <div className="input-box">
                        <input id="username" name="username" type="text" placeholder="Username" required />
                        <i className='bx bxs-user'></i>
                    </div>

                    <div className="input-box">
                        <input id="email" name="email" type="email" placeholder="Email" required />
                        <i className='bx bxs-envelope'></i>
                    </div>

                    <div className="input-box">
                        <input id="name" name="name" type="text" placeholder="Name" required />
                        <i className='bx bxs-user-detail'></i>
                    </div>

                    <div className="input-box">
                        <input id="birthdate" name="birthdate" type="date" required />
                        <i className='bx bxs-calendar'></i>
                    </div>

                    <div className="input-box">
                        <input id="password" name="password" type="password" placeholder="Password" required />
                        <i className='bx bxs-lock-alt'></i>
                    </div>

                    <div className="input-box">
                        <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" required />
                        <i className='bx bxs-lock-alt'></i>
                    </div>

                    <button type="submit" className="btn">Register</button>

                    <div className="register-link">
                        <p>Already have an account? <Link to="/users/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </>
  );
}