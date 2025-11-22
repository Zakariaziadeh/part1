import React from "react";

function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-amber-600 to-amber-800 text-white px-8 py-3 rounded-full text-lg font-semibold mb-4 shadow-lg">
            Since 1975
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6 font-serif">
            Al Mashaal Roasteries
          </h1>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed">
            Crafting exceptional coffee experiences with traditional expertise and modern passion for over four decades.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-amber-100">
            <div className="text-3xl font-bold text-amber-800 mb-2">48+</div>
            <div className="text-amber-600 font-medium">Years Experience</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-amber-100">
            <div className="text-3xl font-bold text-amber-800 mb-2">50K+</div>
            <div className="text-amber-600 font-medium">Happy Customers</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-amber-100">
            <div className="text-3xl font-bold text-amber-800 mb-2">100%</div>
            <div className="text-amber-600 font-medium">Quality Guarantee</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-amber-100">
            <div className="text-3xl font-bold text-amber-800 mb-2">3</div>
            <div className="text-amber-600 font-medium">Generations</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Our Story Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border border-amber-100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-amber-900 mb-6 font-serif">
                  Our Legacy of Excellence
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Founded in 1975, Al Mashaal Roasteries began as a small family venture with a simple mission: 
                  to bring the finest roasted coffee and premium nuts to our community. Today, we continue that 
                  tradition with the same dedication and passion that started it all.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <span className="text-amber-700 text-xl">🌱</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">Premium Selection</h4>
                    <p className="text-gray-600 text-sm">Carefully sourced beans and nuts</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <span className="text-amber-700 text-xl">🔥</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">Traditional Roasting</h4>
                    <p className="text-gray-600 text-sm">Time-honored roasting techniques</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <span className="text-amber-700 text-xl">⭐</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">Quality Assurance</h4>
                    <p className="text-gray-600 text-sm">Rigorous quality control standards</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <span className="text-amber-700 text-xl">👨‍👩‍👧‍👦</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">Family Values</h4>
                    <p className="text-gray-600 text-sm">Three generations of expertise</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-200 to-amber-300 rounded-2xl h-80 md:h-96 flex items-center justify-center shadow-inner">
                <div className="text-center p-8">
                  <span className="text-6xl mb-4 block">☕</span>
                  <p className="text-amber-800 font-semibold text-lg">Al Mashaal Roasteries</p>
                  <p className="text-amber-700 mt-2">Traditional Excellence Since 1975</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-600 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-400 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-amber-600 to-amber-800 text-white rounded-3xl p-8 shadow-2xl">
            <div className="text-amber-200 text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-4 font-serif">Our Mission</h3>
            <p className="text-amber-100 leading-relaxed">
              To preserve and share the authentic flavors of traditional roasting while innovating 
              to meet modern tastes, ensuring every customer experiences the warmth and quality 
              that has defined our family for generations.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white rounded-3xl p-8 shadow-2xl">
            <div className="text-amber-200 text-4xl mb-4">🔮</div>
            <h3 className="text-2xl font-bold mb-4 font-serif">Our Vision</h3>
            <p className="text-amber-100 leading-relaxed">
              To be the most trusted name in premium coffee and nuts, recognized for our unwavering 
              commitment to quality, tradition, and customer satisfaction across generations.
            </p>
          </div>
        </div>

        {/* Business Info Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Business Hours */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-2xl border border-amber-100">
            <h3 className="text-3xl font-bold text-amber-900 mb-6 font-serif">Visit Our Store</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-amber-800 mb-4">Business Hours</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-amber-100">
                    <span className="text-gray-700">Monday - Sunday</span>
                    <span className="font-semibold text-amber-800">8:30 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-amber-100">
                    <span className="text-gray-700">Holidays</span>
                    <span className="font-semibold text-amber-800">9:00 AM - 8:00 PM</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-amber-800 mb-4">Store Features</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Fresh Daily Roasting
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Free Tastings
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Expert Advice
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Custom Blends
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-gradient-to-br from-amber-700 to-amber-900 text-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 font-serif text-center">Get In Touch</h3>
            <div className="text-center space-y-6">
              <div>
                <div className="text-amber-200 text-3xl mb-3">📞</div>
                <p className="text-amber-100 mb-2">Call us for orders & inquiries</p>
                <a 
                  href="tel:81836173" 
                  className="text-3xl font-bold hover:text-amber-200 transition-colors duration-300 block"
                >
                  81836173
                </a>
              </div>
              <div className="pt-6 border-t border-amber-600">
                <p className="text-amber-200 text-sm leading-relaxed">
                  Visit our store and experience the difference that decades of expertise and 
                  family tradition can make in every cup.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border border-amber-100">
          <h2 className="text-4xl font-bold text-amber-900 mb-12 text-center font-serif">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-amber-700 text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">Passion</h3>
              <p className="text-gray-600">
                We pour our heart into every roast, ensuring each batch meets our family's 
                exacting standards of excellence.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-amber-700 text-2xl">⚖️</span>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">Integrity</h3>
              <p className="text-gray-600">
                Honest business practices and transparent sourcing have been our foundation 
                since day one.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-amber-700 text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">Community</h3>
              <p className="text-gray-600">
                We believe in building lasting relationships with our customers and supporting 
                our local community.
              </p>
            </div>
          </div>
        </div>

        {/* Legacy Footer */}
        <div className="text-center">
          <div className="inline-block border-t-2 border-amber-300 pt-8">
            <p className="text-amber-800 font-semibold text-xl mb-2">
              A Legacy of Flavor Since 1975
            </p>
            <p className="text-amber-600 font-medium">
              Family Owned • Community Focused • Quality Driven
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;