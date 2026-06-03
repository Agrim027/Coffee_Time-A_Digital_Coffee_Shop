import React, { useState } from 'react';
import './Registration.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        address: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        
        
        // Clear messages when user starts typing
        if (error) setError('');
        if (success) setSuccess('');
    };

    const validateForm = () => {
        // Username validation
        if (formData.username.length < 3) {
            setError('Username must be at least 3 characters long');
            return false;
        }

        // Password validation
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        // Phone validation (simple validation for Indian numbers)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            setError('Please enter a valid 10-digit phone number');
            return false;
        }

        if (formData.address.trim().length < 8) {
            setError('Please enter a valid address (at least 8 characters)');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    if (!validateForm()) {
        setLoading(false);
        return;
    }

    try {
        // Remove confirmPassword from data sent to backend
        const { confirmPassword, ...registrationData } = formData;

        console.log('Sending registration data:', registrationData);

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData),
        });

        const data = await response.json();
        console.log('Server response:', data);

        if (data.success) {
            setSuccess(data.message);
            // Save token to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Auto-redirect after 2 seconds
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } else {
            setError(data.message || `Registration failed (Status: ${response.status})`);
        }
    } catch (error) {
        console.error('Registration error:', error);
        setError(`Network error: ${error.message}. Please check if the server is running.`);
    } finally {
        setLoading(false);
    }
};

    const handleReset = () => {
        setFormData({
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            phone: '',
           
            address: ''
        });
        setError('');
        setSuccess('');
    };

    // CSS styles for messages
    const messageStyles = {
        error: {
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '20px',
            border: '1px solid #ffcdd2'
        },
        success: {
            backgroundColor: '#e8f5e9',
            color: '#2e7d32',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '20px',
            border: '1px solid #c8e6c9'
        }
    };

    return (
        <div className="registration-page">
            <div className="registration-container">
                <h1>Registration Form</h1>
                <p className="form-description">Please fill in all fields to create your account</p>
                
                {error && (
                    <div style={messageStyles.error}>
                        <strong>Error:</strong> {error}
                    </div>
                )}
                
                {success && (
                    <div style={messageStyles.success}>
                        <strong>Success:</strong> {success}
                        <p>Redirecting to login page...</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="username">User Name: *</label></td>
                                <td>
                                    <input 
                                        type="text" 
                                        id="username" 
                                        name="username" 
                                        placeholder="Enter your name (min 3 characters)" 
                                        className="input" 
                                        value={formData.username}
                                        onChange={handleChange}
                                        required 
                                        disabled={loading}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="password">Password: *</label></td>
                                <td>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        placeholder="Enter password (min 6 characters)" 
                                        className="input" 
                                        value={formData.password}
                                        onChange={handleChange}
                                        required 
                                        disabled={loading}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="confirmPassword">Confirm Password: *</label></td>
                                <td>
                                    <input 
                                        type="password" 
                                        id="confirmPassword" 
                                        name="confirmPassword" 
                                        placeholder="Re-enter your password" 
                                        className="input" 
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required 
                                        disabled={loading}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="email">E-mail ID: *</label></td>
                                <td>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        placeholder="Enter your email" 
                                        className="input" 
                                        value={formData.email}
                                        onChange={handleChange}
                                        required 
                                        disabled={loading}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><label htmlFor="phone">Phone No.: *</label></td>
                                <td>
                                    <input 
                                        type="text" 
                                        id="phone" 
                                        name="phone" 
                                        placeholder="Enter 10-digit phone number" 
                                        className="input" 
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required 
                                        disabled={loading}
                                    />
                                </td>
                            </tr>

                            

                            <tr>
                                <td><label htmlFor="address">Address: *</label></td>
                                <td>
                                    <textarea 
                                        id="address" 
                                        name="address" 
                                        className="input" 
                                        placeholder="Enter your complete address (min 10 characters)" 
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        rows="4"
                                    ></textarea>
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>
                                    <div className="button-group">
                                        <button 
                                            type="submit" 
                                            className="btn btn-register"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner"></span>
                                                    Registering...
                                                </>
                                            ) : 'Register'}
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn btn-clear"
                                            onClick={handleReset}
                                            disabled={loading}
                                        >
                                            Clear
                                        </button>
                                        <a href="/login" className="btn-link">
                                            Already have an account? Login
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            
        </div>
    );
};

export default Registration;