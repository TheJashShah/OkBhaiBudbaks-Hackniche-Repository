import { useState } from "react";

export default function Checkout() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order Placed Successfully!");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Billing & Shipping Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Billing & Shipping Details</h2>
            
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" required />

            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" required />

            <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" required />

            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" required />

              <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" required />
            </div>

            {/* Payment Details */}
            <h2 className="text-xl font-semibold text-gray-800 mt-6">Payment Details</h2>

            <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" required />

            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="expiry" placeholder="Expiry Date (MM/YY)" value={formData.expiry} onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" required />

              <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500" required />
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-500">
              Place Order
            </button>
          </form>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <p className="text-gray-700">Wireless Headphones</p>
                <p className="text-gray-900 font-semibold">$49.99</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Smart Watch</p>
                <p className="text-gray-900 font-semibold">$89.99</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <p>Total</p>
                <p>$139.98</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
