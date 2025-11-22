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

  const remove = (value) => {
    setStds(stds.filter((item) => item.ID !== value));
  };
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Customers Feedbacks
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Feedbacks</h2>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setStds([...stds, state]);
              setState(customers);
              console.log(stds);
            }}
          >
            

            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                value={state.fullname}
                name="fullname"
                type="text"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone
              </label>
              <input
                value={state.phone}
                name="phone"
                type="text"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Feedback
              </label>
              <input
                value={state.feedback}
                name="feedback"
                type="text"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              type="submit"
            >
              Submit Feedback
            </button>
          </form>
        </div>

        {stds.length === 0 && (
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No Feedbacks Yet!
          </h1>
        )}

        

        

        {/* Feedbacks Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Cutomers Feedbacks</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Full Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Phone
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Feedback
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {stds.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    
                    <td className="border border-gray-300 px-4 py-2">
                      {item.fullname}
                    </td>
                    
                    <td className="border border-gray-300 px-4 py-2">
                      {item.phone}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
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
