import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Cart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('🛒 Loaded cart from localStorage:', savedCart);
    setCart(savedCart);
    setIsLoading(false);
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      console.log('💾 Saved cart to localStorage:', cart);
    }
  }, [cart, isLoading]);

  // Calculate totals
  const subtotal = cart.reduce((total, item) => 
    total + (parseFloat(item.price) || 0) * (item.quantity || 1), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const proceedToCheckout = async () => {
    if (cart.length === 0) {
      setError("Cart is empty");
      return;
    }

    setOrderStatus('processing');
    setError("");

    try {
      // Get user token
      const token = localStorage.getItem('token');
      if (!token) {
        setError("You need to be logged in. Redirecting to login...");
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 2000);
        return;
      }

      // Prepare order data - SIMPLIFIED VERSION
      const items = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price) || 0,
        quantity: item.quantity || 1
      }));

      const orderData = {
        items: items,
        total: total.toFixed(2),
        shippingAddress: "Store Pickup",
        paymentMethod: "cash"
      };

      console.log('📦 Sending order data:', orderData);

      // Try direct fetch as fallback
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      console.log('📦 Order response:', data);

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      if (data.success) {
        // Generate order number if not provided
        const orderNumber = data.order?.orderNumber || `ORD-${Date.now()}`;
        
        setOrderDetails({
          orderNumber: orderNumber,
          total: data.order?.total || total.toFixed(2),
          itemCount: items.reduce((total, item) => total + (item.quantity || 1), 0),
          orderId: data.order?.id,
          status: data.order?.status || 'pending'
        });
        
        setOrderStatus('success');
        clearCart();
        
        // Also clear user's cart in backend
        try {
          await API.post('/cart', { cart: [] });
        } catch (cartErr) {
          console.log('Note: Could not clear backend cart', cartErr);
        }
      } else {
        setError(data.message || "Order failed. Please try again.");
        setOrderStatus(null);
      }
    } catch (err) {
      console.error('❌ Checkout error:', err);
      
      // Test if backend is reachable
      try {
        const test = await fetch('http://localhost:5000/api/test');
        console.log('Backend test:', test.ok ? '✅ Backend is running' : '❌ Backend error');
      } catch (testErr) {
        console.log('Backend test failed:', testErr.message);
      }

      if (err.message.includes('Network Error') || err.message.includes('Failed to fetch')) {
        setError(`Cannot connect to backend server. Please ensure:
        1. Backend is running: node index.js
        2. Server URL: http://localhost:5000
        3. Check terminal for errors`);
      } else if (err.message.includes('401') || err.message.includes('token')) {
        setError('Your session has expired. Please login again.');
        localStorage.clear();
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 2000);
      } else {
        setError(`Order failed: ${err.message}`);
      }
      
      setOrderStatus(null);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700 text-lg">Loading cart...</p>
        </div>
      </div>
    );
  }

  // Show order success screen
  if (orderStatus === 'success' && orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold text-green-800 mb-4">Order Confirmed! 🎉</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your purchase. Your order number is:
            </p>
            <div className="text-2xl font-mono font-bold text-green-700 bg-green-50 p-4 rounded-lg mb-8">
              {orderDetails.orderNumber}
            </div>

            <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-200">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Order Summary</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Total Amount:</strong> 
                    <span className="ml-2 text-xl font-bold text-green-700">${orderDetails.total}</span>
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Items:</strong> 
                    <span className="ml-2">{orderDetails.itemCount} items</span>
                  </p>
                  <p className="text-gray-700">
                    <strong>Status:</strong> 
                    <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {orderDetails.status}
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Pickup Information</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Method:</strong> Store Pickup
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Payment:</strong> Cash on Pickup
                  </p>
                  <p className="text-gray-700">
                    <strong>Store Hours:</strong> 8:30 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  const receipt = `
                    Al Mashaal Roasteries
                    Order Receipt
                    --------------------
                    Order #: ${orderDetails.orderNumber}
                    Date: ${new Date().toLocaleDateString()}
                    Time: ${new Date().toLocaleTimeString()}
                    --------------------
                    Total: $${orderDetails.total}
                    Items: ${orderDetails.itemCount}
                    --------------------
                    Status: ${orderDetails.status}
                    Payment: Cash on Pickup
                    Pickup: Store Pickup
                    --------------------
                    Thank you for your order!
                    Phone: 81836173
                  `;
                  alert('Receipt copied to clipboard!\n\n' + receipt);
                  navigator.clipboard.writeText(receipt);
                }}
                className="border border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Copy Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show order processing screen
  if (orderStatus === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-amber-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Processing Order</h2>
          <p className="text-amber-700 mb-2">Please wait...</p>
        </div>
      </div>
    );
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-amber-900 mb-4">Your Cart is Empty</h1>
            <p className="text-amber-700 mb-8 text-lg">
              Add some delicious products to get started!
            </p>
            <Link
              to="/"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 inline-block"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-semibold">Error:</p>
            <p className="text-sm whitespace-pre-line">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded"
            >
              Retry
            </button>
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Your Cart</h1>
          <p className="text-amber-700">{cart.length} items</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-amber-900">Items</h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 font-semibold text-sm bg-red-50 hover:bg-red-100 px-3 py-2 rounded transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border border-amber-200 rounded-lg hover:bg-amber-50"
                  >
                    <div className="w-20 h-20 bg-amber-200 rounded-lg flex items-center justify-center">
                      <span className="text-3xl">
                        {item.category === 'coffee' ? '☕' : 
                         item.category === 'nuts' ? '🥜' : 
                         item.category === 'chocolate' ? '🍫' : '🍬'}
                      </span>
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-semibold text-amber-900">{item.name}</h3>
                      <p className="text-amber-600 text-sm">{item.description}</p>
                      <p className="text-lg font-bold text-amber-800 mt-1">
                        ${item.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="w-8 h-8 rounded-full bg-amber-200 hover:bg-amber-300 flex items-center justify-center disabled:opacity-50"
                        disabled={(item.quantity || 1) <= 1}
                      >
                        <span className="text-amber-800 font-bold">-</span>
                      </button>
                      <span className="w-8 text-center font-semibold text-amber-900">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="w-8 h-8 rounded-full bg-amber-200 hover:bg-amber-300 flex items-center justify-center"
                      >
                        <span className="text-amber-800 font-bold">+</span>
                      </button>
                    </div>

                    <div className="text-right min-w-20">
                      <p className="text-lg font-bold text-amber-800">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm mt-1 bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-amber-700">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700">Tax (8%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-amber-200 pt-3">
                  <span className="text-lg font-bold text-amber-900">Total</span>
                  <span className="text-lg font-bold text-amber-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button 
                onClick={proceedToCheckout}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold text-lg mb-4"
              >
                Checkout Now
              </button>

              <Link
                to="/"
                className="w-full border border-amber-600 text-amber-600 hover:bg-amber-50 py-3 rounded-lg font-semibold text-lg text-center block"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-700">
                  <strong>Store Pickup Only</strong><br/>
                  Pay when you collect. Bring your order number.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
