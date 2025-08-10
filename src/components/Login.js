import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any valid email/password
      const userData = {
        id: 1,
        name: formData.email.split('@')[0],
        email: formData.email,
        avatar: `https://ui-avatars.com/api/?name=${formData.email.split('@')[0]}&background=6366f1&color=fff`
      };
      
      // Store user data in localStorage if remember me is checked
      if (formData.rememberMe) {
        localStorage.setItem('movielib_user', JSON.stringify(userData));
      }
      
      // Call the onLogin callback
      if (onLogin) {
        onLogin(userData);
      }
      
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@movielib.com',
      password: 'demo123',
      rememberMe: false
    });
  };

  const handleSocialLogin = (provider) => {
    // Simulate social login
    alert(`${provider} login would be implemented here`);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          {/* Login Form Side */}
          <div className="login-form-section">
            <div className="login-form-container">
              {/* Header */}
              <div className="login-header">
                <Link to="/" className="login-brand">
                  <span className="brand-icon">🎬</span>
                  <span className="brand-text">MovieLib</span>
                </Link>
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">
                  Sign in to access your personal movie library
                </p>
              </div>

              {/* Demo Login Button */}
              <div className="demo-login">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm demo-btn"
                  onClick={handleDemoLogin}
                >
                  <span>⚡</span>
                  Fill Demo Credentials
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="login-form">
                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <div className="input-container">
                    <span className="input-icon">📧</span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input focus-ring ${errors.email ? 'form-input-error' : ''}`}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-container">
                    <span className="input-icon">🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`form-input focus-ring ${errors.password ? 'form-input-error' : ''}`}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="error-text">{errors.password}</span>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="forgot-link">
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {errors.submit}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⭯</span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="divider">
                <span className="divider-text">Or continue with</span>
              </div>

              {/* Social Login */}
              <div className="social-login">
                <button
                  type="button"
                  className="social-btn google-btn"
                  onClick={() => handleSocialLogin('Google')}
                >
                  <span className="social-icon">🇬</span>
                  Google
                </button>
                <button
                  type="button"
                  className="social-btn github-btn"
                  onClick={() => handleSocialLogin('GitHub')}
                >
                  <span className="social-icon">🐙</span>
                  GitHub
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="signup-link">
                <p>
                  Don't have an account?{' '}
                  <Link to="/signup" className="link-primary">
                    Sign up for free
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Welcome Side */}
          <div className="login-welcome-section">
            <div className="welcome-content">
              <div className="welcome-animation">
                <div className="floating-card card-1">
                  <img src="/api/placeholder/120/180" alt="Movie 1" />
                </div>
                <div className="floating-card card-2">
                  <img src="/api/placeholder/120/180" alt="Movie 2" />
                </div>
                <div className="floating-card card-3">
                  <img src="/api/placeholder/120/180" alt="Movie 3" />
                </div>
                <div className="welcome-circle circle-1"></div>
                <div className="welcome-circle circle-2"></div>
                <div className="welcome-circle circle-3"></div>
              </div>
              
              <div className="welcome-text">
                <h2 className="welcome-title">
                  Your Personal Movie Universe
                </h2>
                <p className="welcome-description">
                  Discover, collect, and organize thousands of movies and TV shows. 
                  Build your perfect watchlist and never miss a great film again.
                </p>
                
                <div className="welcome-features">
                  <div className="feature-item">
                    <span className="feature-icon">🔍</span>
                    <span>Search thousands of movies</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📚</span>
                    <span>Build your personal library</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🌓</span>
                    <span>Beautiful dark mode</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;




