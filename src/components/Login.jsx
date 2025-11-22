import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    console.log("Login submitted:", loginData);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Basic validation - you can add proper authentication here
      if (loginData.username && loginData.password) {
        // Store login state in localStorage or context
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', loginData.username);
        
        // Navigate to home page
        navigate('/');
      } else {
        alert('Please enter both username and password');
      }
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl flex">
        
        {/* Left Side - Background Image */}
        <div 
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/mashaallogo.png')` }}
        >
          {/* Overlay for better text readability */}
          <div className="h-full bg-amber-900 bg-opacity-70 flex items-center justify-center p-8">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Mashaal Roasteries</h2>
              <p className="text-amber-200 text-lg">Since 1975</p>
              <div className="mt-6 bg-amber-800 bg-opacity-50 p-4 rounded-lg">
                <p className="text-amber-100">Premium Coffee • Fresh Nuts • Quality Chocolate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center mb-8">
            <div className="md:hidden mb-4">
              <h2 className="text-2xl font-bold text-amber-900">Mashaal Roasteries</h2>
              <p className="text-amber-700">Since 1975</p>
            </div>
            <h1 className="text-3xl font-bold text-amber-900 mb-2">Welcome Back</h1>
            <p className="text-amber-700">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-amber-800 mb-2">
                Username
              </label>
              <input
                onChange={handleChange}
                value={loginData.username}
                name="username"
                placeholder="Enter your username"
                type="text"
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 outline-none bg-amber-50"
                required
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
            <a href="#" className="text-sm text-amber-600 hover:text-amber-800 transition-colors duration-200">
              Forgot your password?
            </a>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-amber-200">
            <p className="text-amber-700 text-sm">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-amber-600 hover:text-amber-800 font-semibold transition-colors duration-200">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo credentials hint */}
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-700 text-center">
              <strong>Demo:</strong> Enter any username and password to login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;