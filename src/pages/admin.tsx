import { useState } from "react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const sidebarItems = [
    { name: "Dashboard" },
    { name: "Orders" },
    { name: "Products" },
    { name: "Customers" },
    { name: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-2xl font-bold text-indigo-600">ShopMart Admin</div>
        <nav className="mt-6">
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActiveTab(item.name)}
                  className={`block w-full px-6 py-3 text-left text-gray-700 hover:bg-indigo-100 ${
                    activeTab === item.name ? "bg-indigo-500 text-white" : ""
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-gray-800">{activeTab}</h1>

        {activeTab === "Dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-indigo-600">₹32,500</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-600">Orders</p>
              <p className="text-2xl font-bold text-indigo-600">1,250</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-600">Customers</p>
              <p className="text-2xl font-bold text-indigo-600">5,430</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-indigo-600">₹120,000</p>
            </div>
          </div>
        )}

        {/* Orders Table */}
        {activeTab === "Orders" && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Orders</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3 border">Order ID</th>
                  <th className="p-3 border">Customer</th>
                  <th className="p-3 border">Total</th>
                  <th className="p-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-700">
                  <td className="p-3 border">#00123</td>
                  <td className="p-3 border">Mahesh Kumar</td>
                  <td className="p-3 border">₹13000</td>
                  <td className="p-3 border text-green-600 font-semibold">Shipped</td>
                </tr>
                <tr className="text-gray-700">
                  <td className="p-3 border">#00124</td>
                  <td className="p-3 border">Jane Smith</td>
                  <td className="p-3 border">₹10000</td>
                  <td className="p-3 border text-yellow-600 font-semibold">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
