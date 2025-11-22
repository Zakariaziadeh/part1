import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-amber-800 text-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out">
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-700 bg-amber-900">
          <h2 className="text-xl font-semibold">Navigation</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-amber-200 transition-colors p-1 rounded-full hover:bg-amber-700 text-2xl font-bold"
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors text-lg font-medium border-l-4 border-transparent hover:border-amber-300"
                onClick={onClose}
              >
                <span className="mr-3">🏠</span>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/feedbacks"
                className="flex items-center py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors text-lg font-medium border-l-4 border-transparent hover:border-amber-300"
                onClick={onClose}
              >
                <span className="mr-3">💬</span>
                Feedbacks
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className="flex items-center py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors text-lg font-medium border-l-4 border-transparent hover:border-amber-300"
                onClick={onClose}
              >
                <span className="mr-3">ℹ️</span>
                About Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-amber-700 bg-amber-900 mt-auto">
          <div className="text-center">
            <p className="font-semibold text-amber-100">Mashaal Roasteries</p>
            <p className="text-amber-300 text-sm mt-1">Since 1975</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;