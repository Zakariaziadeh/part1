
import { useState, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feedback from "./components/Feedback";
import Aboutus from "./components/Aboutus";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Auth from "./components/Auth";
import Cart from "./components/Cart";
import API from "./services/api"; // Add this import

// Protected Route component with token verification
function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    // Verify token with backend
    API.get('/auth/verify')
      .then(response => {
        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('isAuthenticated');
          setIsAuthenticated(false);
        }
      })
      .catch(error => {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700">Checking authentication...</p>
        </div>
      </div>
    );
  }

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
