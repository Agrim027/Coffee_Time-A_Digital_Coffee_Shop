import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }

        // Listen for login/logout events
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Custom event listener for login/logout
        window.addEventListener('userLogin', handleStorageChange);
        window.addEventListener('userLogout', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('userLogin', handleStorageChange);
            window.removeEventListener('userLogout', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Update state
        setUser(null);
        
        // Trigger custom event for other components
        window.dispatchEvent(new Event('userLogout'));
        
        // Redirect to home page
        navigate('/');
        setActiveIndex(0);
        
        // Show logout message
        alert('Logged out successfully!');
    };

    const getInitials = (username) => {
        if (!username) return 'U';
        return username.charAt(0).toUpperCase();
    };

    const getAvatarColor = (username) => {
        if (!username) return '#6a11cb';
        
        // Generate a color based on username
        const colors = [
            '#6a11cb', '#2575fc', '#ff416c', '#ff4b2b', '#7b4397',
            '#42e695', '#3a7bd5', '#00d2ff', '#f46b45', '#eea849'
        ];
        const index = username.length % colors.length;
        return colors[index];
    };

    const navItems = user ? [
        { name: 'Home', link: '/', target: '_self' },
        { name: 'Product', link: '/products', target: '_blank' },
        { name: 'Cart', link: '/cart', target: '_self' }
    ] : [
        { name: 'Home', link: '/', target: '_self' },
        { name: 'Product', link: '/products', target: '_blank' },
        { name: 'Cart', link: '/cart', target: '_self' },
        { name: 'Login', link: '/login', target: '_self' },
        { name: 'Registration', link: '/registration', target: '_self' }
    ];

    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/Image/logo.png" alt="Logo" />
                <span className="logo-text">Coffee Time</span>
            </div>
            
            <ul className="navlist">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <a 
                            href={item.link} 
                            target={item.target}
                            className={activeIndex === index ? 'active' : ''}
                            onClick={() => setActiveIndex(index)}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            {item.name}
                        </a>
                    </li>
                ))}

                {user && (
                    <li className="user-dropdown">
                        <div className="user-avatar-container">
                            <div 
                                className="user-avatar"
                                style={{ 
                                    backgroundColor: getAvatarColor(user.username),
                                    color: 'white'
                                }}
                            >
                                {getInitials(user.username)}
                            </div>
                            <span className="username">{user.username}</span>
                            <div className="dropdown-content">
                                <div className="user-info">
                                    <div className="user-avatar-large"
                                        style={{ 
                                            backgroundColor: getAvatarColor(user.username),
                                            color: 'white'
                                        }}
                                    >
                                        {getInitials(user.username)}
                                    </div>
                                    <div className="user-details">
                                        <strong>{user.username}</strong>
                                        <small>{user.email}</small>
                                    </div>
                                </div>
                                <div className="dropdown-divider"></div>
                                <a href="/profile" className="dropdown-item">
                                    <i className="fas fa-user"></i> My Profile
                                </a>
                                <a href="/orders" className="dropdown-item">
                                    <i className="fas fa-shopping-bag"></i> My Orders
                                </a>
                                <a href="/settings" className="dropdown-item">
                                    <i className="fas fa-cog"></i> Settings
                                </a>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i> Logout
                                </button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Header;