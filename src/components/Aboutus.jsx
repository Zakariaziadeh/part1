import React from "react";

function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-amber-900 mb-4">
            Al Machaal Roasteries
          </h1>
          <div className="inline-block bg-amber-800 text-white px-6 py-2 rounded-full text-lg font-semibold">
            Since 1975
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">
                Crafting Excellence for Generations
              </h2>
              
              <div className="space-y-4 text-gray-700 text-lg">
                <p className="flex items-start">
                  <span className="text-amber-600 text-2xl mr-3">•</span>
                  <span className="font-semibold text-amber-800">Finest Selection:</span> Premium nuts, aromatic coffee, and exquisite chocolate
                </p>
                
                <p className="flex items-start">
                  <span className="text-amber-600 text-2xl mr-3">•</span>
                  <span className="font-semibold text-amber-800">Expert Craftsmanship:</span> Traditional roasting methods meet modern excellence
                </p>
                
                <p className="flex items-start">
                  <span className="text-amber-600 text-2xl mr-3">•</span>
                  <span className="font-semibold text-amber-800">Quality Guarantee:</span> Every product reflects our 50+ years of expertise
                </p>
              </div>
            </div>

            {/* Right Side - Image Placeholder */}
            <div className="bg-amber-200 rounded-xl h-64 md:h-80 flex items-center justify-center">
              <span className="text-amber-800 text-lg font-semibold">
                Image of Our Roastery
              </span>
            </div>
          </div>
        </div>

        {/* Business Hours & Contact */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Business Hours */}
          <div className="bg-amber-800 text-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Business Hours</h3>
            <div className="text-center space-y-3">
              <p className="text-xl font-semibold">All Week Long</p>
              <p className="text-3xl font-bold text-amber-200">8:30 AM - 10:00 PM</p>
              <p className="text-amber-100 mt-4">Ready to serve you with passion and dedication</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-amber-600 text-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Contact Us</h3>
            <div className="text-center space-y-4">
              <div>
                <p className="text-amber-100 mb-2">For more information</p>
                <a 
                  href="tel:81836173" 
                  className="text-3xl font-bold hover:text-amber-200 transition-colors duration-300 block"
                >
                  81836173
                </a>
              </div>
              <div className="mt-4">
                <p className="text-amber-100">Visit us and experience the difference that decades of expertise make</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legacy Footer */}
        <div className="text-center mt-12">
          <div className="inline-block border-t-2 border-amber-600 pt-4">
            <p className="text-amber-800 font-semibold text-lg">
              A Legacy of Flavor Since 1975 • Family Owned & Operated
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;