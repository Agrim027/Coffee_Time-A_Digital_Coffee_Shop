import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                alert('Login successful!');
                // Save token to localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                // Redirect to home or dashboard
                window.location.href = '/';
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            username: '',
            password: ''
        });
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h1>Login</h1>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">User Name or Email:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username"
                        className="input" 
                        placeholder="Enter your username or email" 
                        value={formData.username}
                        onChange={handleChange}
                        required 
                    />

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        className="input" 
                        placeholder="Enter your password" 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />

                    <input 
                        type="submit" 
                        value={loading ? "Logging in..." : "Login"} 
                        className="btn" 
                        disabled={loading}
                    />
                    <input type="button" value="Clear" className="btn" onClick={handleReset} />
                </form>

                <div className="extra-links">
                    <p>Don't have an account? <a href="/registration">Register here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;