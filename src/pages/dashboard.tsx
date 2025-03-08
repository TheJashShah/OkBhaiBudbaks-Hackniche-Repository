import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white p-6 shadow-lg flex flex-col items-center md:items-start">
        <h1 className="text-xl font-bold text-blue-600 md:block hidden">Best<span className="text-black">BuyCo</span></h1>
        <h1 className="text-xl font-bold text-blue-600 block md:hidden">BB</h1>
        <nav className="mt-6 space-y-4 w-full">
          <a className="block text-gray-700 font-semibold p-2 rounded-lg hover:bg-gray-200 flex items-center justify-center md:justify-start" href="#">
            <span className="md:hidden">🏬</span>
            <span className="hidden md:block">Popular Products</span>
          </a>
          <a className="block bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center md:justify-start" href="#">
            <span className="md:hidden">🔍</span>
            <span className="hidden md:block">Explore New</span>
          </a>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white p-4 h-30 w-[71vw] shadow-md flex flex-col items-center md:flex-row md:h-20 md:justify-between ">
            <div className="w-full flex justify-between flex-col md:flex-row ">
            <h2 className="text-xl font-bold text-center m-auto md-m-auto md:ml-0 md:text-left">Explore</h2>
            <input className="w-[200px] md:w-full max-w-xs h-10 rounded-full  m-auto md:m-0 md:ml-auto md:mt-0 mt-2 bg-gradient-to-br from-blue-50 to-slate-100 text-center" placeholder="Search..." />
            </div>
        </div>
        {/* Product Grid */}
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-100"></div>
      </div>
    </div>
  );
};

export default Dashboard;
