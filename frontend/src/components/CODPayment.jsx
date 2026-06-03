import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Payment.css';
import logoImg from '../assets/logo.png';

const CODPayment = () => {
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

    const confirmOrder = () => {
        // Save order
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderDetails);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart and pending order
        localStorage.removeItem('cart');
        localStorage.removeItem('pendingOrder');
        
        alert(`✅ Order Confirmed!\nOrder ID: ${orderDetails.orderId}\nAmount: ₹${orderDetails.total}\nPay when your order arrives!`);
        navigate('/');
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
                <div className="payment-box cod-box">
                    <h1>💰 Cash on Delivery</h1>
                    
                    <div className="cod-icon">💵</div>
                    
                    <div className="order-summary-payment">
                        <h3>Order Summary</h3>
                        <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                        <p><strong>Amount to Pay:</strong> ₹{orderDetails.total}</p>
                        <p><strong>Delivery Address:</strong> {orderDetails.customerInfo.address}, {orderDetails.customerInfo.city} - {orderDetails.customerInfo.pincode}</p>
                    </div>

                    <div className="cod-info">
                        <h4>How it works:</h4>
                        <ul>
                            <li>✅ Order now, pay when you receive</li>
                            <li>✅ Pay cash to our delivery partner</li>
                            <li>✅ Get instant confirmation</li>
                            <li>✅ No online payment required</li>
                        </ul>
                    </div>

                    <div className="cod-actions">
                        <button onClick={confirmOrder} className="confirm-cod-btn">
                            Confirm Cash on Delivery Order
                        </button>
                        
                        <Link to="/cart" className="back-link">
                            ← Back to Cart
                        </Link>
                    </div>

                    <div className="security-note">
                        🔒 Your order is confirmed and will be delivered soon
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CODPayment;