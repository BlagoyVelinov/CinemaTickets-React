export default function Footer() {
    return (
        <footer id="footer">
            <div className="left">
                <div className="right">
                    <div className="footerlink">
                        <p className="lf">
                            Copyright &copy; 2024 <a href="/about-us">Cinema Tickets</a> - About Us
                        </p>
                        <p className="rf">
                            <img src="/images/icon2.gif" alt="contact" />
                            <a href="/contact-us">Contact us</a>
                        </p>
                        <div style={{ clear: 'both' }}></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}