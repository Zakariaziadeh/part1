import React from "react";
import { Link } from "react-router-dom";

function Cart() {
  // Get cart from localStorage or use empty array
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage')); // Trigger storage event to update other components
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('storage'));
  };

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
                  className="text-red-600 hover:text-red-800 font-semibold text-sm"
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
                        className="w-8 h-8 rounded-full bg-amber-200 hover:bg-amber-300 flex items-center justify-center transition-colors"
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
                        className="text-red-600 hover:text-red-800 text-sm mt-1"
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

              <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors duration-200 mb-4">
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