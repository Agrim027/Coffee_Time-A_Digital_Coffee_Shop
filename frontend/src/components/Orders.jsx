import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token || !storedUser) {
            navigate('/login');
            return;
        }
    }, [navigate]);

    const handleGoToCart = () => {
        navigate('/cart');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('profilePhoto');
        window.dispatchEvent(new Event('userLogout'));
        navigate('/login');
    };

    return (
        <div className="orders-page">
            {/* Header */}
            <nav className="navbar">
                <div className="logo">
                    <img src="/logo.png" alt="Coffee Shop Logo" />
                    <span className="logo-text">Coffee Time</span>
                </div>
                <ul className="navlist">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/orders" className="active">Orders</Link></li>
                </ul>
            </nav>

            <div className="orders-container">
                <div className="orders-content">
                    <h1>My Orders</h1>
                    <p className="orders-subtitle">
                        You don't have any active orders right now.
                    </p>

                    {/* Simple Message Card */}
                    <div className="order-message-card">
                        <div className="message-icon">
                            <i className="fas fa-shopping-bag"></i>
                        </div>
                        <h2>No Active Orders</h2>
                        <p>Your order history is empty. Start shopping to place your first order!</p>
                        
                        <div className="message-actions">
                            <button 
                                className="btn-go-to-cart"
                                onClick={handleGoToCart}
                            >
                                <i className="fas fa-shopping-cart"></i> Go to Cart
                            </button>
                            <Link to="/products">
                                <button className="btn-continue-shopping">
                                    <i className="fas fa-store"></i> Continue Shopping
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Help */}
                    <div className="quick-help">
                        <h3>Need Help?</h3>
                        <p>If you're looking for your order history or need assistance with a previous order, please contact our support team.</p>
                        <div className="contact-info">
                            <p><i className="fas fa-phone"></i> +91 7652022879</p>
                            <p><i className="fas fa-envelope"></i> support@coffeetime.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer>
                <div className="footer-logo">
                    <img src="/logo.png" alt="Coffee Shop Logo" />
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
                    <Link to="/profile">Profile</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/orders">Orders</Link>
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
                Designed & Developed by <a href="https://www.linkedin.com/in/gupta-agrim/" target="_blank" rel="noopener noreferrer">Agrim Gupta</a>
            </div>
        </div>
    );
};

export default Orders;