
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api"; // Add this import

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
    
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get('/products');
      
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setError("Failed to load products");
        // Fallback to sample products if API fails
        setProducts(getSampleProducts());
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError("Cannot connect to server. Using sample products.");
      // Fallback to sample products
      setProducts(getSampleProducts());
    } finally {
      setLoading(false);
    }
  };

  // Sample products for fallback
  const getSampleProducts = () => {
    return [
      {
        id: 1,
        name: "Premium Coffee Beans",
        price: 12.99,
        description: "Freshly roasted premium coffee beans",
        category: "coffee"
      },
      {
        id: 2,
        name: "Mixed Nuts",
        price: 8.50,
        description: "Premium quality mixed nuts",
        category: "nuts"
      },
      {
        id: 3,
        name: "Dark Chocolate",
        price: 6.75,
        description: "Rich dark chocolate bars",
        category: "chocolate"
      },
      {
        id: 4,
        name: "Turkish Delight",
        price: 5.25,
        description: "Traditional Turkish delight",
        category: "sweets"
      },
      {
        id: 5,
        name: "Roasted Almonds",
        price: 7.99,
        description: "Freshly roasted almonds",
        category: "nuts"
      },
      {
        id: 6,
        name: "Arabic Coffee",
        price: 9.99,
        description: "Traditional Arabic coffee blend",
        category: "coffee"
      }
    ];
  };

  const addToCart = (product) => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = savedCart.findIndex(item => item.id === product.id);
    let updatedCart;

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      updatedCart = [...savedCart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: (updatedCart[existingItemIndex].quantity || 1) + 1
      };
    } else {
      // Add new item
      updatedCart = [...savedCart, { ...product, quantity: 1 }];
    }

    // Save to localStorage and state
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);

    // Dispatch event to update navbar cart count
    window.dispatchEvent(new Event('cartUpdated'));

    // Show notification
    setNotification(`✓ ${product.name} added to cart!`);
    setTimeout(() => setNotification(""), 3000);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  // Get emoji for product category
  const getCategoryEmoji = (category) => {
    switch (category?.toLowerCase()) {
      case 'coffee': return '☕';
      case 'nuts': return '🥜';
      case 'chocolate': return '🍫';
      case 'sweets': return '🍬';
      default: return '📦';
    }
  };

  return (
    <>
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          {notification}
        </div>
      )}

      {/* Main Content */}
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

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
              {error}
            </div>
          )}

          {/* Products Grid */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-amber-800 text-center mb-8">
              Our Premium Products
            </h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
                <p className="text-amber-700">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-amber-700 text-lg">No products available</p>
                <button 
                  onClick={fetchProducts}
                  className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Product Image Placeholder with Emoji */}
                    <div className="h-48 bg-gradient-to-r from-amber-200 to-amber-300 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-6xl mb-2 block">
                          {getCategoryEmoji(product.category)}
                        </span>
                        <span className="text-amber-800 text-lg font-semibold">
                          {product.category || 'Product'}
                        </span>
                      </div>
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
                          disabled={loading}
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
            )}

            {/* Store Info Section */}
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
