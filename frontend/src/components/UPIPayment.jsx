import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Payment.css';

const UPIPayment = () => {
    const [upiId, setUpiId] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder'));
        if (!pendingOrder) {
            navigate('/cart');
            return;
        }
        setOrderDetails(pendingOrder);
    }, [navigate]);

    const handleUPISubmit = (e) => {
        e.preventDefault();
        
        if (!upiId) {
            alert('Please enter your UPI ID');
            return;
        }

        setIsProcessing(true);

        // Simulate UPI payment processing
        setTimeout(() => {
            // Save successful order
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(orderDetails);
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Clear cart and pending order
            localStorage.removeItem('cart');
            localStorage.removeItem('pendingOrder');
            
            setIsProcessing(false);
            alert(`✅ UPI Payment Successful!\nOrder ID: ${orderDetails.orderId}\nAmount: ₹${orderDetails.total}`);
            navigate('/');
        }, 3000);
    };

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="payment-page">
            <nav className="navbar">
                <div className="logo">
                    <img src="/logo.png" alt="Logo" />
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
                    <h1>📱 UPI Payment</h1>
                    
                    <div className="order-summary-payment">
                        <h3>Order Summary</h3>
                        <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                        <p><strong>Amount:</strong> ₹{orderDetails.total}</p>
                    </div>

                    <div className="qr-section">
                        <div className="qr-code">
                            <div className="qr-placeholder">
                                <span>QR CODE</span>
                                <div className="qr-image">
                                    <div className='upi'>
                                        <img src="UPI.png" alt="QR" />
                                    </div>
                                </div>
                                <p>Scan to Pay</p>
                            </div>
                        </div>
                        
                        <div className="or-divider">OR</div>
                        
                        <form onSubmit={handleUPISubmit} className="upi-form">
                            <div className="form-group">
                                <label>Enter UPI ID</label>
                                <input
                                    type="text"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                    placeholder="yourname@upi"
                                    required
                                />
                            </div>
                            
                            <button type="submit" className="pay-now-btn" disabled={isProcessing}>
                                {isProcessing ? 'Processing...' : `Pay ₹${orderDetails.total}`}
                            </button>
                        </form>
                    </div>

                    <div className="upi-apps">
                        <h4>Supported UPI Apps</h4>
                        <div className="apps-grid">
                            <span>Google Pay</span>
                            <span>PhonePe</span>
                            <span>Paytm</span>
                            <span>BHIM</span>
                        </div>
                    </div>

                    <Link to="/cart" className="back-link">
                        ← Back to Cart
                    </Link>

                    <div className="security-note">
                        🔒 Your payment is secure with UPI
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UPIPayment;