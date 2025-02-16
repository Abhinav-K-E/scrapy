// AdminLoginPage.jsx
import React, { useState } from 'react';
import './AdminLogin.scss'
import logo from '../../assets/images/logo.svg'; // Make sure to add your logo file

const AdminLoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Here you would typically make an API call to your backend
      // For example: const response = await loginService.login(email, password);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the onLogin callback with user information
      if (onLogin) {
        onLogin({ email });
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="admin-page">
      {/* Top Navigation Bar */}
      <nav className="admin-navbar">
        <div className="logo-container">
          <img src={logo} alt="Company Logo" className="logo-image" />
        </div>
      </nav>
      
      {/* Main Container */}
      <div className="admin-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome, Admin</h1>
            <p>Please log in to access your dashboard</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com" 
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required
                disabled={isLoading}
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;