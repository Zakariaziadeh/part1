
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import API from "../services/api"; // Add this import

function Navbar({ onSideBarToggle }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Load user data and cart count
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }

    // Load cart count
    updateCartCount();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartItemCount(count);
  };

  const handleLogout = async () => {
    try {
      // Clear all local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('cart');
      
      // Reset state
      setUser(null);
      setCartItemCount(0);
      
      console.log("Logged out successfully");
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Still navigate to login even if there's an error
      navigate("/auth/login");
    }
  };

  const currentUserName = user?.fullName || 'Customer';

  return (
    <nav className="bg-gradient-to-r from-amber-800 to-amber-900 w-full py-3 shadow-2xl border-b border-amber-600">
      <div className="flex items-center justify-between px-6">
        {/* Left - Menu button */}
        <div className="flex items-center">
          <button
            onClick={onSideBarToggle}
            className="text-amber-100 hover:text-white transition-colors p-2 rounded-lg hover:bg-amber-700"
            aria-label="Toggle sidebar"
          >
            <MenuIcon />
          </button>
        </div>

        {/* Center - Branding */}
        <div className="flex flex-col items-center">
          <div className="flex items-baseline space-x-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white font-serif tracking-tight">
              Al Mashaal
            </h1>
            <span className="text-amber-300 text-lg md:text-xl font-light tracking-widest uppercase">
              Roasteries
            </span>
          </div>
          <div className="mt-1 flex items-center space-x-2">
            <div className="h-0.5 w-4 bg-amber-400"></div>
            <span className="text-amber-200 text-xs font-medium tracking-widest">
              Since 1975
            </span>
            <div className="h-0.5 w-4 bg-amber-400"></div>
          </div>
        </div>

        {/* Right - User actions */}
        <div className="flex items-center space-x-4">
          {/* Cart with badge */}
          <Link 
            to="/cart"
            className="relative text-amber-100 hover:text-white transition-colors p-2 rounded-lg hover:bg-amber-700"
            aria-label="Shopping cart"
          >
            <ShoppingCartIcon />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-amber-800">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User welcome */}
          <span className="text-amber-100 text-sm hidden md:block border-r border-amber-600 pr-4">
            Welcome, <span className="font-semibold">{currentUserName}</span>
          </span>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="text-amber-100 hover:text-white transition-colors flex items-center gap-2 bg-amber-700 hover:bg-amber-600 px-3 py-2 rounded-lg border border-amber-600"
            aria-label="Logout"
          >
            <LogoutIcon fontSize="small" />
            <span className="hidden sm:inline text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-center space-x-8 mt-3 pt-3 border-t border-amber-700">
        <Link 
          className="text-amber-100 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-amber-700" 
          to="/"
        >
          Home
        </Link>
        <Link 
          className="text-amber-100 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-amber-700" 
          to="/feedbacks"
        >
          Feedbacks
        </Link>
        <Link 
          className="text-amber-100 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-amber-700" 
          to="/aboutus"
        >
          About Us
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
