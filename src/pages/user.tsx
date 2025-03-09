import { useState } from "react";

interface Order {
  id: number;
  item: string;
  price: number;
  status: string;
  date: string;
}

interface Recommendation {
  id: number;
  name: string;
  price: number;
}

export default function Dashboard() {
  const userName = "ABC";
  const [loyaltyPoints, setLoyaltyPoints] = useState(120);

  const recentOrders: Order[] = [
    { id: 1, item: "Wireless Headphones", price: 49.99, status: "Delivered", date: "March 5, 2025" },
    { id: 2, item: "Smart Watch", price: 89.99, status: "Shipped", date: "March 6, 2025" },
    { id: 3, item: "Smart Watch", price: 89.99, status: "Shipped", date: "March 6, 2025" },
    { id: 4, item: "Smart Watch", price: 79.99, status: "Shipped", date: "March 6, 2025" },
  ];

  const recommendations: Recommendation[] = [
    { id: 1, name: "Bluetooth Speaker", price: 39.99 },
    { id: 2, name: "Gaming Mouse", price: 29.99},
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">User Dashboard</h1>
          <a href="/dashboard" className="text-lg font-semibold text-blue-600 hover:underline">
            Continue Shopping →
          </a>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome, {userName}!</h2>
            <p className="text-gray-600 mt-1">Here's your latest activity on ShopMart.</p>
          </div>
          <div className="text-center bg-indigo-100 px-6 py-3 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-600">Loyalty Points</h3>
            <p className="text-xl font-bold text-gray-900">{loyaltyPoints}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="border-b py-4 flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{order.item}</h4>
                    <p className="text-gray-600">₹{order.price.toFixed(2)} - {order.date}</p>
                  </div>
                  <span
                    className={`px-4 py-1 rounded-md text-sm font-semibold ${
                      order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No recent orders yet.</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Recommended for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                </div>
                <a
                  href="/shop"
                  className="ml-auto px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-500">View
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
