import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Payment.css';
import logoImg from '../assets/logo.png';

const CardPayment = () => {
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: '',
        saveCard: false
    });
    const [orderDetails, setOrderDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder'));
        if (!pendingOrder) {
            navigate('/cart');
            return;
        }
        setOrderDetails(pendingOrder);
    }, [navigate]);

    const handleCardChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCardDetails(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCardSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiry || !cardDetails.cvv) {
            alert('Please fill in all card details');
            return;
        }

        // Simulate payment processing
        setTimeout(() => {
            // Save successful order
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(orderDetails);
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Clear cart and pending order
            localStorage.removeItem('cart');
            localStorage.removeItem('pendingOrder');
            
            alert(`✅ Payment Successful!\nOrder ID: ${orderDetails.orderId}\nAmount: ₹${orderDetails.total}`);
            navigate('/');
        }, 2000);
    };

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="payment-page">
            <nav className="navbar">
                <div className="logo">
                    <img src={logoImg} alt="Logo" />
                    <span className="logo-text">Coffee Time</span>
                </div>
                <ul className="navlist">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                </ul>
            </nav>

            <div className="payment-container">
                <div className="payment-box">
                    <h1>💳 Card Payment</h1>
                    
                    <div className="order-summary-payment">
                        <h3>Order Summary</h3>
                        <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                        <p><strong>Amount:</strong> ₹{orderDetails.total}</p>
                    </div>

                    <form onSubmit={handleCardSubmit} className="payment-form">
                        <div className="form-group">
                            <label>Card Number</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={cardDetails.cardNumber}
                                onChange={handleCardChange}
                                placeholder="1234 5678 9012 3456"
                                maxLength="19"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Cardholder Name</label>
                            <input
                                type="text"
                                name="cardName"
                                value={cardDetails.cardName}
                                onChange={handleCardChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    value={cardDetails.expiry}
                                    onChange={handleCardChange}
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    value={cardDetails.cvv}
                                    onChange={handleCardChange}
                                    placeholder="123"
                                    maxLength="3"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="saveCard"
                                checked={cardDetails.saveCard}
                                onChange={handleCardChange}
                            />
                            <label>Save card for future payments</label>
                        </div>

                        <button type="submit" className="pay-now-btn">
                            Pay ₹{orderDetails.total}
                        </button>

                        <Link to="/cart" className="back-link">
                            ← Back to Cart
                        </Link>
                    </form>

                    <div className="security-note">
                        🔒 Your payment details are secure and encrypted
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPayment;