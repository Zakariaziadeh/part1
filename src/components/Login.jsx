// Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
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
    console.log("Login submitted:", loginData);
    navigate('/home');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
       <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              onChange={handleChange}
              name="username"
              placeholder="Enter your username"
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
              required
            />
          </div>
          
           <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              placeholder="Enter your password"
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
              required
            />
          </div>

         <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-6">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
            Forgot your password?
          </a>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/components/signup" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;