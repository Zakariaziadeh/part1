import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api'; // Add this import

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(""); // Clear error on change
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Call backend API
      const response = await API.post('/auth/login', {
        email: loginData.username,  // Note: backend expects 'email' field
        password: loginData.password
      });
      
      // Save token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('isAuthenticated', 'true');
      
      console.log('Login successful:', response.data);
      
      // Navigate to home page
      navigate('/');
      
    } catch (err) {
      console.error('Login error:', err);
      
      // Show user-friendly error message
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message === 'Network Error') {
        setError('Cannot connect to server. Make sure backend is running on port 5000.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex">
        
        {/* Left Side - Branding */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center p-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Al Mashaal Roasteries</h2>
            <p className="text-amber-200 text-lg">Since 1975</p>
            <div className="mt-6 bg-amber-800 bg-opacity-50 p-4 rounded-lg">
              <p className="text-amber-100">Premium Coffee • Fresh Nuts • Quality Products</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <div className="md:hidden mb-4">
              <h2 className="text-2xl font-bold text-amber-900">Al Mashaal Roasteries</h2>
              <p className="text-amber-700">Since 1975</p>
            </div>
            <h1 className="text-3xl font-bold text-amber-900 mb-2">Welcome Back</h1>
            <p className="text-amber-700">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-amber-800 mb-2">
                Email
              </label>
              <input
                onChange={handleChange}
                value={loginData.username}
                name="username"
                placeholder="Enter your email"
                type="text"
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 outline-none bg-amber-50"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-amber-800 mb-2">
                Password
              </label>
              <input
                onChange={handleChange}
                value={loginData.password}
                name="password"
                placeholder="Enter your password"
                type="password"
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 outline-none bg-amber-50"
                required
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
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-amber-600">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-amber-600 hover:text-amber-800 font-semibold transition-colors duration-200">
                Sign up
              </Link>
            </p>
          </div>

          {/* Test credentials */}
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-700 text-center">
              <strong>Test Account:</strong><br />
              Email: test@example.com<br />
              Password: password123
            </p>
            <p className="text-xs text-amber-600 mt-2 text-center">
              (Register first if test account doesn't exist)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
