import React, { useState, useEffect } from "react";

function Feedback() {
  const [feedback, setFeedback] = useState({
    full_name: "", // Changed from fullName to full_name
    phone: "",
    message: "",
    rating: 5
  });
  const [feedbacksList, setFeedbacksList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isLoadingFeedbacks, setIsLoadingFeedbacks] = useState(false);

  // Load existing feedbacks
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setIsLoadingFeedbacks(true);
    try {
      console.log('📋 Fetching feedbacks from backend...');
      const response = await fetch('http://localhost:5000/api/feedback');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Feedback data received:', data);
      
      if (data.success) {
        setFeedbacksList(data.feedback || []);
      } else {
        console.warn('Feedback fetch warning:', data.message);
        setFeedbacksList([]);
      }
    } catch (err) {
      console.error('❌ Error fetching feedbacks:', err);
      
      // Show sample data for testing
      setFeedbacksList([
        {
          id: 1,
          full_name: "Sample Customer",
          phone: "12345678",
          message: "This is sample feedback for testing.",
          rating: 5,
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      setIsLoadingFeedbacks(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({ ...prev, [name]: value }));
    setSubmitSuccess("");
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitSuccess("");
    setSubmitError("");

    // Simple validation
    if (!feedback.full_name.trim() || !feedback.message.trim()) {
      setSubmitError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Get user info if logged in
    const userData = localStorage.getItem('user');
    const userId = userData ? JSON.parse(userData).id : null;
    
    const feedbackData = {
      full_name: feedback.full_name.trim(),
      phone: feedback.phone.trim(),
      message: feedback.message.trim(),
      rating: parseInt(feedback.rating) || 5,
      user_id: userId // Add user_id if user is logged in
    };

    console.log('📤 Submitting feedback:', feedbackData);

    try {
      // Use direct fetch instead of API to avoid axios issues
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData)
      });

      const data = await response.json();
      console.log('✅ Feedback response:', data);

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      if (data.success) {
        setSubmitSuccess("Thank you for your feedback! It has been submitted successfully.");
        
        // Reset form
        setFeedback({
          full_name: "",
          phone: "",
          message: "",
          rating: 5
        });
        
        // Refresh list
        setTimeout(() => {
          fetchFeedbacks();
        }, 1000);
      } else {
        setSubmitError(data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error('❌ Submit error:', err);
      
      // Test backend connection
      try {
        const test = await fetch('http://localhost:5000/api/test');
        console.log('Backend test:', test.ok ? '✅ Backend running' : '❌ Backend error');
      } catch (testErr) {
        console.log('Backend test failed:', testErr.message);
      }

      if (err.message.includes('Network Error') || err.message.includes('Failed to fetch')) {
        setSubmitError(`Cannot connect to server. Please ensure backend is running:
        Open terminal and run: node index.js`);
      } else {
        setSubmitError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-amber-900 mb-8">
          Customer Feedback
        </h1>

        {/* Feedback Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-amber-200">
          <h2 className="text-xl font-semibold mb-4 text-amber-800">Share Your Feedback</h2>
          
          {submitSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {submitSuccess}
            </div>
          )}
          
          {submitError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <p className="font-semibold">Error:</p>
              <p className="text-sm whitespace-pre-line">{submitError}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-amber-700 mb-1">
                Full Name *
              </label>
              <input
                value={feedback.full_name}
                name="full_name" // Changed from fullName to full_name
                type="text"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50"
                required
                disabled={loading}
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-amber-700 mb-1">
                Phone (Optional)
              </label>
              <input
                value={feedback.phone}
                name="phone"
                type="text"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50"
                disabled={loading}
                placeholder="Phone number"
              />
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-amber-700 mb-1">
                Rating
              </label>
              <select
                value={feedback.rating}
                name="rating"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50"
                disabled={loading}
              >
                <option value="5">★★★★★ Excellent</option>
                <option value="4">★★★★☆ Good</option>
                <option value="3">★★★☆☆ Average</option>
                <option value="2">★★☆☆☆ Fair</option>
                <option value="1">★☆☆☆☆ Poor</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-amber-700 mb-1">
                Your Feedback *
              </label>
              <textarea
                value={feedback.message}
                name="message"
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50 resize-none"
                required
                disabled={loading}
                placeholder="Share your experience..."
              />
            </div>

            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-amber-200">
          <h3 className="text-lg font-semibold mb-4 text-amber-800">Customer Reviews</h3>
          
          {isLoadingFeedbacks ? (
            <p className="text-amber-600 text-center py-4">Loading feedback...</p>
          ) : feedbacksList.length === 0 ? (
            <p className="text-amber-600 text-center py-4">No feedback yet. Be the first to share!</p>
          ) : (
            <div className="space-y-4">
              {feedbacksList.map((item, index) => (
                <div key={index} className="border-b border-amber-100 pb-4 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-amber-900">{item.full_name}</h4>
                      {item.phone && (
                        <p className="text-sm text-amber-600">Phone: {item.phone}</p>
                      )}
                    </div>
                    <div className="text-amber-600">
                      <span className="text-yellow-500 text-lg">{renderStars(item.rating)}</span>
                      <span className="ml-2 text-sm">({item.rating}/5)</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{item.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(item.created_at).toLocaleDateString()} at {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Debug Info */}
        <div className="text-center text-sm text-amber-600">
          <p>Backend URL: http://localhost:5000/api</p>
          <p>Having issues? Check that backend is running with: <code>node index.js</code></p>
        </div>
      </div>
    </div>
  );
}

export default Feedback;