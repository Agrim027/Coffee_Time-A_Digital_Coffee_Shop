import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';
import logoImg from '../assets/logo.png';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        address: ''
    });
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token || !storedUser) {
            navigate('/login');
            return;
        }

        try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setFormData({
                username: parsedUser.username || '',
                email: parsedUser.email || '',
                phone: parsedUser.phone || '',
                address: parsedUser.address || ''
            });
            
            // Load profile photo from localStorage if exists
            const savedPhoto = localStorage.getItem('profilePhoto');
            if (savedPhoto) {
                setPhotoPreview(savedPhoto);
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setMessage({ type: 'error', text: 'File size should be less than 5MB' });
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                setMessage({ type: 'error', text: 'Please select an image file' });
                return;
            }

            setProfilePhoto(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhotoUpload = async () => {
        if (!profilePhoto) {
            setMessage({ type: 'error', text: 'Please select a photo first' });
            return;
        }

        setMessage({ type: '', text: '' });
        
        try {
            // Save to localStorage
            localStorage.setItem('profilePhoto', photoPreview);
            
            setMessage({ type: 'success', text: 'Profile photo updated successfully!' });
            setProfilePhoto(null);
            
            // Trigger update for Header component
            window.dispatchEvent(new Event('userLogin'));
            
        } catch (error) {
            console.error('Error uploading photo:', error);
            setMessage({ type: 'error', text: 'Failed to update profile photo' });
        }
    };

    const handleRemovePhoto = () => {
        localStorage.removeItem('profilePhoto');
        setPhotoPreview('');
        setProfilePhoto(null);
        setMessage({ type: 'success', text: 'Profile photo removed' });
        
        // Trigger update for Header component
        window.dispatchEvent(new Event('userLogin'));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        const token = localStorage.getItem('token');
        
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/users/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (data.success) {
                setMessage({ type: 'success', text: data.message });
                
                // Update local storage with new user data
                const updatedUser = { ...user, ...formData };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                
                // Trigger update for Header component
                window.dispatchEvent(new Event('userLogin'));
                
                // Exit edit mode after successful update
                setTimeout(() => setEditMode(false), 1500);
            } else {
                setMessage({ type: 'error', text: data.message });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({ type: 'error', text: 'Failed to update profile' });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('profilePhoto');
        window.dispatchEvent(new Event('userLogout'));
        navigate('/login');
    };

    const getInitials = (username) => {
        if (!username) return 'U';
        return username.charAt(0).toUpperCase();
    };

    const getAvatarColor = (username) => {
        if (!username) return '#7c573c';
        const colors = ['#7c573c', '#2c1e1e', '#8d7c7c', '#5a4740', '#d4a574'];
        const index = username.length % colors.length;
        return colors[index];
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    if (loading) {
        return (
            <div className="profile-loading">
                <div className="spinner"></div>
                <p>Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="profile-page">
            {/* Header */}
            <nav className="navbar">
                <div className="logo">
                    <img src={logoImg} alt="Coffee Shop Logo" />
                    <span className="logo-text">Coffee Time</span>
                </div>
                <ul className="navlist">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/profile" className="active">Profile</Link></li>
                </ul>
            </nav>

            <div className="profile-container">
                <div className="profile-content">
                    <h1>Coffee Time Profile</h1>
                    <p className="profile-subtitle">
                        Welcome back, {user.username}! Manage your account details and preferences.
                    </p>
                    
                    {message.text && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    {/* Profile Photo Section */}
                    <div className="profile-photo-section">
                        <div className="photo-container">
                            {photoPreview ? (
                                <img 
                                    src={photoPreview} 
                                    alt="Profile" 
                                    className="profile-photo"
                                />
                            ) : (
                                <div 
                                    className="profile-photo-placeholder"
                                    style={{ backgroundColor: getAvatarColor(user.username) }}
                                >
                                    {getInitials(user.username)}
                                </div>
                            )}
                            
                            <div className="photo-overlay">
                                <button 
                                    className="btn-change-photo"
                                    onClick={triggerFileInput}
                                >
                                    <i className="fas fa-camera"></i>
                                </button>
                            </div>
                            
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handlePhotoChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                        </div>
                        
                        <div className="photo-actions">
                            <button 
                                className="btn-upload"
                                onClick={handlePhotoUpload}
                                disabled={!profilePhoto}
                            >
                                Upload Photo
                            </button>
                            {photoPreview && (
                                <button 
                                    className="btn-remove"
                                    onClick={handleRemovePhoto}
                                >
                                    Remove Photo
                                </button>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-section">
                            <h2>Personal Information</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>Address</h2>
                            <div className="form-group">
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={!editMode}
                                    rows="3"
                                    required
                                    placeholder="Enter your complete address"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            {editMode ? (
                                <>
                                    <button type="submit" className="btn-save">
                                        Save Changes
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn-cancel"
                                        onClick={() => setEditMode(false)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button 
                                    className="btn-edit"
                                    onClick={() => setEditMode(true)}
                                >
                                    Edit Profile
                                </button>
                            )}
                            <button 
                                className="btn-logout"
                                onClick={handleLogout}
                            >
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
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

export default Profile;