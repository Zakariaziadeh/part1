import Footer from "./Footer";

function Home() {
  return (
    <>
      {/* Main Content Area */}
      <div className="min-h-screen bg-gray-100">
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-amber-900 mb-6 text-center">
              Welcome to Mashaal Roasteries
            </h1>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <h2 className="text-2xl font-semibold text-amber-800 mb-4">
                  Our Products
                </h2>
                <ul className="space-y-2 text-amber-700">
                  <li>• Premium Roasted Coffee</li>
                  <li>• Fresh Nuts & Dry Fruits</li>
                  <li>• Quality Chocolate</li>
                  <li>• Traditional Sweets</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <h2 className="text-2xl font-semibold text-amber-800 mb-4">
                  Quick Links
                </h2>
                <ul className="space-y-2 text-amber-700">
                  <li>• View Customer Feedbacks</li>
                  <li>• Learn About Our History</li>
                  <li>• Contact Our Team</li>
                  <li>• Visit Our Store</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">
                Experience the taste of tradition since 1975
              </p>
              <div className="bg-amber-800 text-white inline-block px-6 py-3 rounded-full font-semibold">
                Family Owned & Operated
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;