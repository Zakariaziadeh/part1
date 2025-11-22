import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Sign up for a new account</p>
        </div>
        
        <form>
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            />
          </div>
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            />
          </div>
          <div className="mb-6">
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;