import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar({onSideBarHide,onNavLogout}) {
  return (
    <nav className="bg-amber-800 w-screen py-4"> {/* Increased padding for thickness */}
      <div className="flex flex-col items-center relative">
        
        {/* Top row - Menu, Title, and Logout */}
        <div className="flex items-center justify-between w-full px-4">
          {/* Left - Menu button */}
          <div className="flex items-center">
            <button
              onClick={() => {
                onSideBarHide();
              }}
              className="text-white"
            >
              <MenuIcon />
            </button>
          </div>

          {/* Center - Title */}
          <div className="text-2xl text-white font-semibold absolute left-1/2 transform -translate-x-1/2">
            Mashaal Roasteries
          </div>

          {/* Right - Logout button */}
          <div className="flex items-center">
            <button
              onClick={() => {
                onNavLogout();
              }}
              className="text-white"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>

        {/* Bottom row - Navigation links */}
        <div className="flex justify-center space-x-8 mt-2">
          <Link 
            className="text-lg text-white hover:text-blue-200 transition-colors" 
            to="/feedbacks"
          >
            Feedbacks
          </Link>
          <Link 
            className="text-lg text-white hover:text-blue-200 transition-colors" 
            to="/"
          >
            home
          </Link>
          
          <Link 
            className="text-lg text-white hover:text-blue-200 transition-colors" 
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