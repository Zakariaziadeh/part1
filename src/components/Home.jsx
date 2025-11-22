import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const products = [
    {
      id: 1,
      name: "Premium Coffee Beans",
      price: 12.99,
      image: "/images/coffee-beans.jpg",
      description: "Freshly roasted premium coffee beans"
    },
    {
      id: 2,
      name: "Mixed Nuts",
      price: 8.50,
      image: "/images/mixed-nuts.jpg",
      description: "Premium quality mixed nuts"
    },
    {
      id: 3,
      name: "Dark Chocolate",
      price: 6.75,
      image: "/images/dark-chocolate.jpg",
      description: "Rich dark chocolate bars"
    },
    {
      id: 4,
      name: "Turkish Delight",
      price: 5.25,
      image: "/images/turkish-delight.jpg",
      description: "Traditional Turkish delight"
    },
    {
      id: 5,
      name: "Roasted Almonds",
      price: 7.99,
      image: "/images/roasted-almonds.jpg",
      description: "Freshly roasted almonds"
    },
    {
      id: 6,
      name: "Arabic Coffee",
      price: 9.99,
      image: "/images/arabic-coffee.jpg",
      description: "Traditional Arabic coffee blend"
    }
  ];

  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState("");

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Listen for storage events (when cart is updated from other components)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);

    // Show notification
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(""), 3000);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          {notification}
        </div>
      )}

      {/* Main Content Area */}
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="p-6">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-900 mb-4">
              Welcome to Al Mashaal Roasteries
            </h1>
            <p className="text-lg text-amber-700 mb-2">
              Experience the taste of tradition since 1975
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="bg-amber-800 text-white px-4 py-2 rounded-full font-semibold">
                Family Owned & Operated
              </div>
              <Link
                to="/cart"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold transition-colors duration-200 flex items-center gap-2"
              >
                <span>🛒 Cart: {getTotalItems()} items</span>
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-amber-800 text-center mb-8">
              Our Premium Products
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="h-48 bg-amber-200 flex items-center justify-center">
                    <span className="text-amber-800 text-lg font-semibold text-center px-4">
                      {product.name}
                    </span>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-amber-800">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
                      >
                        <span>Add to Cart</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Info Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <h2 className="text-2xl font-semibold text-amber-800 mb-4">
                  Why Choose Al Mashaal?
                </h2>
                <ul className="space-y-3 text-amber-700">
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Premium quality products since 1975
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Traditional roasting methods
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Fresh ingredients daily
                  </li>
                  <li className="flex items-center">
                    <span className="text-amber-600 mr-3">✓</span>
                    Family-owned business
                  </li>
                </ul>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <h2 className="text-2xl font-semibold text-amber-800 mb-4">
                  Store Information
                </h2>
                <div className="space-y-3 text-amber-700">
                  <p className="flex items-center">
                    <span className="text-amber-600 mr-3">🕒</span>
                    Open Daily: 8:30 AM - 10:00 PM
                  </p>
                  <p className="flex items-center">
                    <span className="text-amber-600 mr-3">📞</span>
                    Phone: 81836173
                  </p>
                  <p className="flex items-center">
                    <span className="text-amber-600 mr-3">📍</span>
                    Visit us for the best experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </>
  );
}

export default Home;