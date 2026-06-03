import React from 'react';
import './Footer.css';
import logoImg from '../assets/Image/logo.png';

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer-logo">
                    <img src={logoImg} alt="Coffee Shop Logo" />
                    <h2>Coffee Shop</h2>
                    <p>123 Brew Street, Roastery Lane<br />New Delhi, India</p>
                    <p>📞 +91 7652022879</p>
                    <p><strong>Open Monday - Sunday</strong><br />7:00 AM - 10:00 PM</p>

                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <a href="/registration" target="_blank">Registration</a>
                    <a href="/login" target="_blank">Login</a>
                    <a href="/products" target="_blank">Product</a>
                    <a href="/cart" target="_blank">Cart</a>
                </div>

                <div className="footer-about">
                    <h3>About Coffee Shop</h3>
                    <p>
                        At <strong>Coffee Shop</strong>, we believe every sip tells a story.
                        From handpicked beans to perfectly brewed cups, we bring you the true essence of coffee.
                        Whether it's your morning start or a late-night conversation,
                        our blends are made to energize your moments and connect hearts.
                    </p>
                </div>
            </footer>

            <div className="footer-bottom">
                ©2025 Coffee Shop. All Rights Reserved. |
                <a href="#">Privacy Policy</a> |
                <a href="#">Terms of Use</a> |
                <a href="#">Refund Policy</a><br />
                Designed & Developed by <a href="https://www.linkedin.com/in/gupta-agrim/" target="_blank">Agrim Gupta</a>
            </div>
        </>
    );
};

export default Footer;