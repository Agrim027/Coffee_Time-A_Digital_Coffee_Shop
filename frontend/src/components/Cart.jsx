import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [checkoutForm, setCheckoutForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        paymentMethod: 'card'
    });
    const navigate = useNavigate();

    // Product price mapping
    const productPrices = {
        'Spec. Cappuccino': 149, 'Americano': 119, 'Coffee Latte': 109, 'Mocha Brew': 99, 'Espresso': 75, 'Hazelnut Coffee': 69,
        'Indian Chai': 19, 'Green Tea': 49, 'Rose Tea': 59, 'Kesar Tea': 69, 'Tulsi Tea': 29, 'Herbal Tea': 59,
        'Black Forest': 499, 'Bundt Cake': 249, 'Pastries': 99, 'Carrot Cake': 159, 'Waffers': 59,
        'Hot Chocolate': 104, 'Macaron': 75, 'Mousse': 49
    };

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
    };

    const removeFromCart = (index) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartItems(cart);
    };

    const clearCart = () => {
        if (cartItems.length === 0) return;
        if (window.confirm('Clear your entire cart?')) {
            localStorage.setItem('cart', JSON.stringify([]));
            setCartItems([]);
        }
    };

    const getTotalItems = () => cartItems.length;

    const getItemPrice = (itemName) => productPrices[itemName] || 0;

    const calculateSubtotal = () => cartItems.reduce((total, item) => total + getItemPrice(item), 0);

    const calculateShipping = () => calculateSubtotal() > 0 ? 20 : 0;

    const calculateTax = () => Math.round(calculateSubtotal() * 0.05);

    const calculateTotal = () => calculateSubtotal() + calculateShipping() + calculateTax();

    const handleCheckoutClick = () => setShowCheckout(true);

    const handleCheckoutClose = () => {
        setShowCheckout(false);
        setCheckoutForm({
            fullName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            pincode: '',
            paymentMethod: 'card'
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCheckoutForm(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckoutSubmit = (e) => {
        e.preventDefault();
        
        if (!checkoutForm.fullName || !checkoutForm.email || !checkoutForm.phone || !checkoutForm.address || !checkoutForm.city || !checkoutForm.pincode) {
            alert('Please fill in all required fields!');
            return;
        }

        // Save order details temporarily for payment processing
        const orderDetails = {
            orderId: 'ORD' + Date.now(),
            items: cartItems,
            total: calculateTotal(),
            customerInfo: checkoutForm,
            orderDate: new Date().toLocaleDateString(),
            paymentMethod: checkoutForm.paymentMethod
        };

        // Save order to localStorage temporarily
        localStorage.setItem('pendingOrder', JSON.stringify(orderDetails));
        
        // Redirect based on payment method
        switch(checkoutForm.paymentMethod) {
            case 'card':
                navigate('/card-payment');
                break;
            case 'upi':
                navigate('/upi-payment');
                break;
            case 'cod':
                navigate('/cod-payment');
                break;
            default:
                alert('Please select a payment method');
        }
        
        setShowCheckout(false);
    };

    return (
        <div className="cart-page">
            {/* Original Navbar */}
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

            <div className="cart-container">
                <div className="cart-box">
                    <h1>Shopping Cart</h1>
                    
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <div className="empty-icon">🛒</div>
                            <h2>Your cart is empty</h2>
                            <p>Add some delicious items from our products!</p>
                            <Link to="/products" className="shop-btn">
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="cart-content">
                            <div className="cart-header">
                                <span>{getTotalItems()} items in cart</span>
                                <button className="clear-btn" onClick={clearCart}>Clear All</button>
                            </div>
                            
                            <div className="cart-items">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="cart-item">
                                        <span className="item-name">{item}</span>
                                        <div className="item-details">
                                            <span className="item-price">₹{getItemPrice(item)}</span>
                                            <button 
                                                className="remove-btn"
                                                onClick={() => removeFromCart(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <div className="summary-row">
                                    <span>Subtotal:</span>
                                    <span>₹{calculateSubtotal()}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping:</span>
                                    <span>₹{calculateShipping()}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tax:</span>
                                    <span>₹{calculateTax()}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total:</span>
                                    <span>₹{calculateTotal()}</span>
                                </div>
                                
                                <button className="checkout-btn" onClick={handleCheckoutClick}>
                                    Proceed to Checkout
                                </button>
                                
                                <Link to="/products" className="continue-link">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Checkout Modal */}
            {showCheckout && (
                <div className="checkout-modal-overlay">
                    <div className="checkout-modal">
                        <div className="checkout-header">
                            <h2>Checkout</h2>
                            <button className="close-btn" onClick={handleCheckoutClose}>×</button>
                        </div>
                        
                        <form onSubmit={handleCheckoutSubmit} className="checkout-form">
                            <div className="form-section">
                                <h3>Shipping Information</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name *</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={checkoutForm.fullName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={checkoutForm.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={checkoutForm.phone}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Delivery Address *</label>
                                    <textarea
                                        name="address"
                                        value={checkoutForm.address}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your complete address"
                                        rows="3"
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={checkoutForm.city}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your city"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Pincode *</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={checkoutForm.pincode}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter pincode"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Payment Method</h3>
                                <div className="payment-options">
                                    <label className="payment-option">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={checkoutForm.paymentMethod === 'card'}
                                            onChange={handleInputChange}
                                        />
                                        <span>💳 Credit/Debit Card</span>
                                    </label>
                                    <label className="payment-option">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="upi"
                                            checked={checkoutForm.paymentMethod === 'upi'}
                                            onChange={handleInputChange}
                                        />
                                        <span>📱 UPI Payment</span>
                                    </label>
                                    <label className="payment-option">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={checkoutForm.paymentMethod === 'cod'}
                                            onChange={handleInputChange}
                                        />
                                        <span>💰 Cash on Delivery</span>
                                    </label>
                                </div>
                            </div>

                            <div className="order-summary">
                                <h3>Order Summary</h3>
                                <div className="summary-items">
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="summary-item">
                                            <span>{item}</span>
                                            <span>₹{getItemPrice(item)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="summary-total">
                                    <span>Total: ₹{calculateTotal()}</span>
                                </div>
                            </div>

                            <div className="checkout-actions">
                                <button type="button" className="cancel-btn" onClick={handleCheckoutClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="confirm-checkout-btn">
                                    Continue to Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;