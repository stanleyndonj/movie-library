import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = ({ onSignUp }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateForm = () => {
    const newErrors = {};
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters long';
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters long';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^a-zA-Z\d]/.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthLabel = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'Very Weak';
      case 2:
        return 'Weak';
      case 3:
        return 'Fair';
      case 4:
        return 'Good';
      case 5:
        return 'Strong';
      default:
        return '';
    }
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return '#ef4444';
      case 2:
        return '#f59e0b';
      case 3:
        return '#eab308';
      case 4:
        return '#22c55e';
      case 5:
        return '#16a34a';
      default:
        return '#e5e7eb';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, create user account
      const userData = {
        id: Date.now(),
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=6366f1&color=fff`,
        subscribeNewsletter: formData.subscribeNewsletter,
        createdAt: new Date().toISOString()
      };
      
      // Store user data in localStorage
      localStorage.setItem('movielib_user', JSON.stringify(userData));
      
      // Call the onSignUp callback
      if (onSignUp) {
        onSignUp(userData);
      }
      
    } catch (error) {
      setErrors({ submit: 'Sign up failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignUp = (provider) => {
    // Simulate social sign up
    alert(`${provider} sign up would be implemented here`);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-content">
          {/* Sign Up Form Side */}
          <div className="signup-form-section">
            <div className="signup-form-container">
              {/* Header */}
              <div className="signup-header">
                <Link to="/" className="signup-brand">
                  <span className="brand-icon">🎬</span>
                  <span className="brand-text">MovieLib</span>
                </Link>
                <h1 className="signup-title">Create Your Account</h1>
                <p className="signup-subtitle">
                  Join thousands of movie enthusiasts and start building your personal library
                </p>
              </div>

              {/* Sign Up Form */}
              <form onSubmit={handleSubmit} className="signup-form">
                {/* Name Fields */}
                <div className="name-fields">
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <div className="input-container">
                      <span className="input-icon">👤</span>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`form-input focus-ring ${errors.firstName ? 'form-input-error' : ''}`}
                        placeholder="John"
                        autoComplete="given-name"
                      />
                    </div>
                    {errors.firstName && (
                      <span className="error-text">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <div className="input-container">
                      <span className="input-icon">👤</span>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`form-input focus-ring ${errors.lastName ? 'form-input-error' : ''}`}
                        placeholder="Doe"
                        autoComplete="family-name"
                      />
                    </div>
                    {errors.lastName && (
                      <span className="error-text">{errors.lastName}</span>
                    )}
                  </div>
                </div>

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
                      placeholder="john.doe@example.com"
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
                      placeholder="Create a strong password"
                      autoComplete="new-password"
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
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div 
                          className="strength-fill"
                          style={{
                            width: `${(passwordStrength / 5) * 100}%`,
                            backgroundColor: getPasswordStrengthColor(passwordStrength)
                          }}
                        />
                      </div>
                      <span 
                        className="strength-label"
                        style={{ color: getPasswordStrengthColor(passwordStrength) }}
                      >
                        {getPasswordStrengthLabel(passwordStrength)}
                      </span>
                    </div>
                  )}
                  
                  {errors.password && (
                    <span className="error-text">{errors.password}</span>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="input-container">
                    <span className="input-icon">🔒</span>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`form-input focus-ring ${errors.confirmPassword ? 'form-input-error' : ''}`}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="error-text">{errors.confirmPassword}</span>
                  )}
                </div>

                {/* Checkboxes */}
                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    I agree to the{' '}
                    <Link to="/terms" className="link-primary">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="link-primary">Privacy Policy</Link>
                  </label>
                  {errors.agreeToTerms && (
                    <span className="error-text">{errors.agreeToTerms}</span>
                  )}

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onChange={handleInputChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    Subscribe to our newsletter for movie recommendations
                  </label>
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      Create Account
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="divider">
                <span className="divider-text">Or sign up with</span>
              </div>

              {/* Social Sign Up */}
              <div className="social-signup">
                <button
                  type="button"
                  className="social-btn google-btn"
                  onClick={() => handleSocialSignUp('Google')}
                >
                  <span className="social-icon">🇬</span>
                  Google
                </button>
                <button
                  type="button"
                  className="social-btn github-btn"
                  onClick={() => handleSocialSignUp('GitHub')}
                >
                  <span className="social-icon">🐙</span>
                  GitHub
                </button>
              </div>

              {/* Login Link */}
              <div className="login-link">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="link-primary">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Welcome Side */}
          <div className="signup-welcome-section">
            <div className="welcome-content">
              <div className="welcome-animation">
                <div className="feature-card card-1">
                  <div className="feature-icon">🔍</div>
                  <h3>Discover</h3>
                  <p>Search thousands of movies</p>
                </div>
                <div className="feature-card card-2">
                  <div className="feature-icon">📚</div>
                  <h3>Collect</h3>
                  <p>Build your library</p>
                </div>
                <div className="feature-card card-3">
                  <div className="feature-icon">⭐</div>
                  <h3>Organize</h3>
                  <p>Rate and review</p>
                </div>
                <div className="welcome-circle circle-1"></div>
                <div className="welcome-circle circle-2"></div>
              </div>
              
              <div className="welcome-text">
                <h2 className="welcome-title">
                  Start Your Movie Journey Today
                </h2>
                <p className="welcome-description">
                  Join our community of movie lovers and get access to personalized 
                  recommendations, watchlists, and exclusive content.
                </p>
                
                <div className="welcome-stats">
                  <div className="stat-item">
                    <div className="stat-number">10K+</div>
                    <div className="stat-label">Movies</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">5K+</div>
                    <div className="stat-label">Members</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Access</div>
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

export default SignUp;




