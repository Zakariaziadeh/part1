import { useState } from "react";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Home({ homeLogOut }) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <>
      {/* Main Content Area Only - no layout wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-6 bg-gray-200 flex-1">
        {/* Sidebar */}
        <div className={`${isOpen ? "md:col-span-1 block" : "hidden"}`}>
          {isOpen && <Sidebar />}
        </div>
        
        {/* Main Content */}
        <div className={`${isOpen ? "md:col-span-5" : "col-span-full"} p-4`}>
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
            <p>This is your main content area.</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;