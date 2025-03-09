import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black flex flex-col">
        <h2 className="text-xl font-bold p-5 border-b border-gray-700">
          Admin Panel
        </h2>
        <nav className="flex-1 p-5">
          <ul className="space-y-2">
            {["dashboard", "orders", "products", "settings"].map(
              (tab) => (
                <li
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`p-3 rounded-md cursor-pointer hover:bg-indigo-100`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </li>
              )
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[
                { title: "Total Sales", value: "₹1,20,000" },
                { title: "Orders", value: "342" },
                { title: "Customers", value: "1,234" },
                { title: "Revenue", value: "₹3,42,000" },
              ].map((card, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border">
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="text-2xl font-bold mt-2">{card.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
                <div className="h-40 flex items-end space-x-4">
                  {[30, 60, 45, 80, 70, 95, 60].map((height, index) => (
                    <div
                      key={index}
                      className="w-8 bg-indigo-600 rounded-md"
                      style={{ height: `${height}%` }}></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">Last 7 Days</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-lg font-semibold mb-4">Product Trends</h3>
                <div className="h-40 flex items-end space-x-4">
                  {[50, 75, 90, 60, 40, 85, 100].map((height, index) => (
                    <div
                      key={index}
                      className="w-8 bg-green-500 rounded-md"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">Last Week</p>
              </div>
            </div>
          </>
        )}
        {activeTab === "orders" && (
          <>
            <h1 className="text-3xl font-semibold mb-6">Orders</h1>
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Order ID</th>
                      <th className="p-3 text-left">Customer</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Total</th>
                      <th className="p-3 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "ORD1234",
                        customer: "Mahesh Kumar",
                        status: "Completed",
                        total: "₹2,500",
                        date: "Mar 7, 2025",
                      },
                      {
                        id: "ORD1235",
                        customer: "Shivam Mishra",
                        status: "Pending",
                        total: "₹1,200",
                        date: "Mar 6, 2025",
                      },
                    ].map((order, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }`}>
                        <td className="p-3">{order.id}</td>
                        <td className="p-3">{order.customer}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              order.status === "Completed" ? "bg-green-100 text-green-700"
                                : order.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3">{order.total}</td>
                        <td className="p-3">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
