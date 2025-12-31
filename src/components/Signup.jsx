
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api'; // Add this import

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await API.post('/auth/register', formData);
      
      setSuccess('Account created successfully! Redirecting to login...');
      
      // Wait 2 seconds then redirect to login
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
      
    } catch (err) {
      console.error('Signup error:', err);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message === 'Network Error') {
        setError('Cannot connect to server. Make sure backend is running.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex">
        
        {/* Left Side */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center p-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Family</h2>
            <p className="text-amber-200 text-lg">Since 1975</p>
            <div className="mt-6 bg-amber-800 bg-opacity-50 p-4 rounded-lg">
              <p className="text-amber-100">Premium Coffee • Fresh Nuts • Quality Products</p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <div className="md:hidden mb-4">
              <h2 className="text-2xl font-bold text-amber-900">Al Mashaal Roasteries</h2>
              <p className="text-amber-700">Since 1975</p>
            </div>
            <h1 className="text-3xl font-bold text-amber-900 mb-2">Create Account</h1>
            <p className="text-amber-700">Join our coffee community</p>
          </div>
          
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {success}
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input 
                type="text" 
                name="fullName"
                placeholder="Full Name" 
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 outline-none bg-amber-50"
                required
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 outline-none bg-amber-50"
                required
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 outline-none bg-amber-50"
                required
                disabled={isLoading}
              />
            </div>
            <div className="mb-6">
              <input 
                type="text" 
                name="phone"
                placeholder="Phone (Optional)" 
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 outline-none bg-amber-50"
                disabled={isLoading}
              />
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 focus:ring-4 focus:ring-amber-200 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-amber-200">
            <p className="text-amber-700 text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-amber-600 hover:text-amber-800 font-semibold transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
