import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar({ onSideBarToggle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    
    console.log("Logged out successfully");
    
    // Navigate to login page
    navigate("/auth/login");
  };

  // Get current user from localStorage
  const currentUser = localStorage.getItem('user') || 'User';

  return (
    <nav className="bg-amber-800 w-full py-4">
      <div className="flex flex-col items-center relative">
        
        {/* Top row - Menu, Title, and Logout */}
        <div className="flex items-center justify-between w-full px-4">
          {/* Left - Menu button */}
          <div className="flex items-center">
            <button
              onClick={onSideBarToggle}
              className="text-white hover:text-amber-200 transition-colors"
            >
              <MenuIcon />
            </button>
          </div>

          {/* Center - Title */}
          <div className="text-2xl text-white font-semibold absolute left-1/2 transform -translate-x-1/2">
            Mashaal Roasteries
          </div>

          {/* Right - User info and Logout button */}
          <div className="flex items-center gap-4">
            <span className="text-white text-sm hidden md:block">
              Welcome, {currentUser}
            </span>
            <button
              onClick={handleLogout}
              className="text-white hover:text-amber-200 transition-colors flex items-center gap-2 bg-amber-700 hover:bg-amber-600 px-3 py-2 rounded-lg transition-colors"
            >
              <LogoutIcon />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Bottom row - Navigation links */}
        <div className="flex justify-center space-x-8 mt-2">
          <Link 
            className="text-lg text-white hover:text-amber-200 transition-colors" 
            to="/feedbacks"
          >
            Feedbacks
          </Link>
          <Link 
            className="text-lg text-white hover:text-amber-200 transition-colors" 
            to="/"
          >
            Home
          </Link>
          <Link 
            className="text-lg text-white hover:text-amber-200 transition-colors" 
            to="/aboutus"
          >
            About us
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;