import { Link } from 'react-router';

export default function Footer() {
    return (
        <footer id="footer">
            <div className="left">
                <div className="right">
                    <div className="footerlink">
                        <p className="lf">
                            Copyright &copy; 2024 <Link to={"/about-us"} >Contact us</Link> - About Us
                        </p>
                        <p className="rf">
                            <img src="/images/icon2.gif" alt="contact" />
                            <Link to={"/contact-us"} >Contact us</Link>
                        </p>
                        <div style={{ clear: 'both' }}></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}