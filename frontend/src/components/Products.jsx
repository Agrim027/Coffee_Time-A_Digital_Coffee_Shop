import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
    const [cartItems, setCartItems] = useState([]);
    
    // Load cart items on component mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);
    
    const getTotalItems = () => {
        return cartItems.length;
    };

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartItems(cart); // Update state
        alert(product + ' added to cart');
    };

    return (
        <div className="products-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">
                    <img src="/logo.png" alt="Logo" />
                    <span className="logo-text">Coffee Time</span>
                </div>
                <ul className="navlist">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li className="cart-indicator">
                        <Link to="/cart" className="cart-link">
                            🛒 Cart ({getTotalItems()})
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Header Section */}
            <header>
                <div id="head1">
                    <img id="logo1" style={{borderRadius: '100%'}} src="/logo.png" alt="Coffee Shop Logo" className="logo" />
                    <div id="text1">
                        Products
                        <div className="typewriter" id="text2">What Can I Serve To Youu!!!&nbsp;&nbsp;</div>
                    </div>
                </div>
            </header>

            {/* Coffee Section */}
            <div className="div3 cdiv divr">
                <h2 style={{textAlign: 'center', fontSize: '40px'}}>Coffee</h2>
                <br />
                <div id="div3">
                    <div className="product-card">
                        <img className="imgh" src="/Coffee/Cappuccino.avif" alt="Cappuccino" />
                        <h3>Spec. Cappuccino</h3>
                        <p className="price">₹149/-</p>
                        <button className="btncart" onClick={() => addToCart('Spec. Cappuccino')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Coffee/Americano.avif" alt="Americano" />
                        <h3>Americano</h3>
                        <p className="price">₹119/-</p>
                        <button className="btncart" onClick={() => addToCart('Americano')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Coffee/Latte.avif" alt="Latte" />
                        <h3>Coffee Latte</h3>
                        <p className="price">₹109/-</p>
                        <button className="btncart" onClick={() => addToCart('Coffee Latte')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Coffee/Mocha.avif" alt="Mocha" />
                        <h3>Mocha Brew</h3>
                        <p className="price">₹99/-</p>
                        <button className="btncart" onClick={() => addToCart('Mocha Brew')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Coffee/Espresso.avif" alt="Espresso" />
                        <h3>Espresso</h3>
                        <p className="price">₹75/-</p>
                        <button className="btncart" onClick={() => addToCart('Espresso')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Coffee/Hazelnut.avif" alt="Hazelnut" />
                        <h3>Hazelnut Coffee</h3>
                        <p className="price">₹69/-</p>
                        <button className="btncart" onClick={() => addToCart('Hazelnut Coffee')}>Add to cart</button>
                    </div>
                </div>
            </div>

            {/* Tea Section */}
            <br />
            <div className="div3 cdiv divr">
                <h2 style={{textAlign: 'center', fontSize: '40px'}}>Tea</h2>
                <br />
                <div id="div3">
                    <div className="product-card">
                        <img className="imgh" src="/Tea/Indian.avif" alt="Indian Tea" />
                        <h3>Indian Chai</h3>
                        <p className="price">₹19/-</p>
                        <button className="btncart" onClick={() => addToCart('Indian Chai')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Tea/Green.avif" alt="Green Tea" />
                        <h3>Green Tea</h3>
                        <p className="price">₹49/-</p>
                        <button className="btncart" onClick={() => addToCart('Green Tea')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Tea/Rose.avif" alt="Rose Tea" />
                        <h3>Rose Tea</h3>
                        <p className="price">₹59/-</p>
                        <button className="btncart" onClick={() => addToCart('Rose Tea')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Tea/Kesar.avif" alt="Kesar Tea" />
                        <h3>Kesar Tea</h3>
                        <p className="price">₹69/-</p>
                        <button className="btncart" onClick={() => addToCart('Kesar Tea')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Tea/Tulsi.avif" alt="Tulsi Tea" />
                        <h3>Tulsi Tea</h3>
                        <p className="price">₹29/-</p>
                        <button className="btncart" onClick={() => addToCart('Tulsi Tea')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Tea/Herbal.avif" alt="Herbal Tea" />
                        <h3>Herbal Tea</h3>
                        <p className="price">₹59/-</p>
                        <button className="btncart" onClick={() => addToCart('Herbal Tea')}>Add to cart</button>
                    </div>
                </div>
            </div>

            {/* Bakes Section */}
            <br />
            <div className="div3 cdiv divr">
                <h2 style={{textAlign: 'center', fontSize: '40px'}}>Bakes</h2>
                <br />
                <div id="div3">
                    <div className="product-card">
                        <img className="imgh" src="/Beverage/Black forest.avif" alt="Black Forest" />
                        <h3>Black Forest</h3>
                        <p className="price">₹499/-</p>
                        <button className="btncart" onClick={() => addToCart('Black Forest')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Beverage/Bundt cake.jpg" alt="Bundt Cake" />
                        <h3>Bundt Cake</h3>
                        <p className="price">₹249/-</p>
                        <button className="btncart" onClick={() => addToCart('Bundt Cake')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Beverage/Pastries.avif" alt="Pastries" />
                        <h3>Pastries</h3>
                        <p className="price">₹99/-</p>
                        <button className="btncart" onClick={() => addToCart('Pastries')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Beverage/Carrot.avif" alt="Carrot Cake" />
                        <h3>Carrot Cake</h3>
                        <p className="price">₹159/-</p>
                        <button className="btncart" onClick={() => addToCart('Carrot Cake')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Beverage/Waffers.avif" alt="Waffers" />
                        <h3>Waffers</h3>
                        <p className="price">₹59/-</p>
                        <button className="btncart" onClick={() => addToCart('Waffers')}>Add to cart</button>
                    </div>
                </div>
            </div>

            {/* Beverage Section */}
            <br />
            <div className="div3 cdiv divr">
                <h2 style={{textAlign: 'center', fontSize: '40px'}}>Beverage</h2>
                <br />
                <div id="div3">
                    <div className="product-card">
                        <img className="imgh" src="/Beverage/Hot chocolate.avif" alt="Hot Chocolate" />
                        <h3>Hot Chocolate</h3>
                        <p className="price">₹104/-</p>
                        <button className="btncart" onClick={() => addToCart('Hot Chocolate')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Beverage/Macaron.avif" alt="Macaron" />
                        <h3>Macaron</h3>
                        <p className="price">₹75/-</p>
                        <button className="btncart" onClick={() => addToCart('Macaron')}>Add to cart</button>
                    </div>
                    <div className="product-card">
                        <img className="imgh" src="/Beverage/Mousse.avif" alt="Mousse" />
                        <h3>Mousse</h3>
                        <p className="price">₹49/-</p>
                        <button className="btncart" onClick={() => addToCart('Mousse')}>Add to cart</button>
                    </div>
                </div>
            </div>

            {/* Go to Cart Button */}
            <br />
            <div className="cart">
                <Link to="/cart">
                    <button className="gocart">Go to Cart</button>
                </Link>
            </div>
            <br />
            <hr />
            
            {/* Footer Section */}
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
                    <Link to="/registration">Registration</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/products">Product</Link>
                    <Link to="/cart">Cart</Link>
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

export default Products;