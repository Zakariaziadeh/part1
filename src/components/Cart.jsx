import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null); // null, 'processing', 'success'
  const [orderDetails, setOrderDetails] = useState(null);

  // Load cart from localStorage only once on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    setIsLoading(false);
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartStorageUpdated'));
    }
  }, [cart, isLoading]);

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
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
    window.dispatchEvent(new Event('cartStorageUpdated'));
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) return;

    setOrderStatus('processing');
    
    // Simulate order processing
    setTimeout(() => {
      const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 3); // 3 days from now
      
      setOrderDetails({
        orderNumber,
        total: total.toFixed(2),
        itemCount: cart.reduce((total, item) => total + item.quantity, 0),
        estimatedDelivery: estimatedDelivery.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });
      
      setOrderStatus('success');
      clearCart();
    }, 3000);
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
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold text-green-800 mb-4">Order Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your purchase. Your order has been successfully placed.
            </p>

            {/* Order Details */}
            <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-200">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Order Information</h3>
                  <p className="text-gray-700"><strong>Order Number:</strong> {orderDetails.orderNumber}</p>
                  <p className="text-gray-700"><strong>Total Amount:</strong> ${orderDetails.total}</p>
                  <p className="text-gray-700"><strong>Items:</strong> {orderDetails.itemCount}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Delivery Information</h3>
                  <p className="text-gray-700"><strong>Estimated Delivery:</strong> {orderDetails.estimatedDelivery}</p>
                  <p className="text-gray-700"><strong>Shipping:</strong> Standard Delivery</p>
                </div>
              </div>
            </div>

            {/* Order Tracking Steps */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-amber-900 mb-6">Order Tracking</h3>
              <div className="flex justify-between items-center max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <p className="text-sm font-semibold text-green-600">Order Placed</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
                <div className="flex-1 h-1 bg-green-200 mx-2"></div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <p className="text-sm font-semibold text-green-600">Processing</p>
                  <p className="text-xs text-gray-500">Next 24 hours</p>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-gray-500 font-bold">3</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-500">Shipped</p>
                  <p className="text-xs text-gray-500">In 2 days</p>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-gray-500 font-bold">4</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-500">Delivered</p>
                  <p className="text-xs text-gray-500">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Continue Shopping
              </Link>
              
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
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Processing Your Order</h2>
          <p className="text-amber-700 mb-2">Please wait while we confirm your order...</p>
          <p className="text-sm text-amber-600">This will only take a moment</p>
          
          {/* Processing Steps */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-amber-700">Verifying payment</span>
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-amber-700">Confirming order details</span>
              <div className="w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-amber-700">Preparing for shipment</span>
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-amber-900 mb-4">Your Cart is Empty</h1>
            <p className="text-amber-700 mb-8 text-lg">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Shopping Cart</h1>
          <p className="text-amber-700">Review your items and proceed to checkout</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-amber-900">
                  Cart Items ({cart.reduce((total, item) => total + item.quantity, 0)})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 font-semibold text-sm bg-red-50 hover:bg-red-100 px-3 py-1 rounded transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border border-amber-200 rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-amber-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-800 text-sm font-semibold text-center px-2">
                        {item.name}
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="font-semibold text-amber-900">{item.name}</h3>
                      <p className="text-amber-600 text-sm">{item.description}</p>
                      <p className="text-lg font-bold text-amber-800 mt-1">
                        ${item.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-amber-200 hover:bg-amber-300 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                      >
                        <span className="text-amber-800 font-bold">-</span>
                      </button>
                      <span className="w-8 text-center font-semibold text-amber-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-amber-200 hover:bg-amber-300 flex items-center justify-center transition-colors"
                      >
                        <span className="text-amber-800 font-bold">+</span>
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right min-w-20">
                      <p className="text-lg font-bold text-amber-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm mt-1 bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
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
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors duration-200 mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="w-full border border-amber-600 text-amber-600 hover:bg-amber-50 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 text-center block"
              >
                Continue Shopping
              </Link>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200 text-center">
                <div className="text-amber-600 mb-2">🔒 Secure Checkout</div>
                <p className="text-sm text-amber-700">
                  Your payment information is secure and encrypted
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