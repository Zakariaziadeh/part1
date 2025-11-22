import React, { useState } from "react";

function Feedback() {
  var customers = {
    fullname: "",
    phone: "",
    feedback: "",
  };

  const [stds, setStds] = useState([]);
  const [state, setState] = useState(customers);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const remove = (index) => {
    setStds(stds.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-amber-900 mb-8">
          Customers Feedbacks
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-amber-200">
          <h2 className="text-xl font-semibold mb-4 text-amber-800">Add Your Feedback</h2>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setStds([...stds, state]);
              setState(customers);
            }}
          >
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-amber-700 mb-1"
              >
                Full Name
              </label>
              <input
                value={state.fullname}
                name="fullname"
                type="text"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-amber-700 mb-1"
              >
                Phone
              </label>
              <input
                value={state.phone}
                name="phone"
                type="text"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50"
              />
            </div>
            <div>
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-amber-700 mb-1"
              >
                Your Feedback
              </label>
              <input
                value={state.feedback}
                name="feedback"
                type="text"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50"
              />
            </div>

            <button
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              type="submit"
            >
              Submit Feedback
            </button>
          </form>
        </div>

        {stds.length === 0 && (
          <h1 className="text-2xl font-bold text-amber-800 mb-4 text-center">
            No Feedbacks Yet!
          </h1>
        )}

        {/* Feedbacks Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-amber-200">
          <h3 className="text-lg font-semibold mb-4 text-amber-800">Customers Feedbacks</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-amber-300">
              <thead>
                <tr className="bg-amber-100">
                  <th className="border border-amber-300 px-4 py-2 text-left text-amber-800">
                    Full Name
                  </th>
                  <th className="border border-amber-300 px-4 py-2 text-left text-amber-800">
                    Phone
                  </th>
                  <th className="border border-amber-300 px-4 py-2 text-left text-amber-800">
                    Feedback
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {stds.map((item, index) => (
                  <tr key={index} className="hover:bg-amber-50">
                    <td className="border border-amber-300 px-4 py-2 text-amber-900">
                      {item.fullname}
                    </td>
                    <td className="border border-amber-300 px-4 py-2 text-amber-900">
                      {item.phone}
                    </td>
                    <td className="border border-amber-300 px-4 py-2 text-amber-900">
                      {item.feedback}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;