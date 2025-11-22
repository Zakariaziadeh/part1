import { useState, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feedback from "./components/Feedback";
import Aboutus from "./components/Aboutus";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Auth from "./components/Auth";
import Cart from "./components/Cart"; // Import the Cart component

// Protected Route component
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
}

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Check authentication status on app load
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    console.log('Authentication status:', isAuthenticated);
  }, []);

  // Don't show navbar on auth pages
  const showNavbar = !location.pathname.includes('/auth');

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      <div className="min-h-screen flex flex-col">
        {showNavbar && <Navbar onSideBarToggle={toggleSidebar} />}
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen && showNavbar ? 'lg:ml-64' : 'ml-0'}`}>
          <Routes>
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/feedbacks" element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            } />
            <Route path="/aboutus" element={
              <ProtectedRoute>
                <Aboutus />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            
            {/* Auth Routes (public) */}
            <Route path="/auth/*" element={<Auth />} />
            
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;