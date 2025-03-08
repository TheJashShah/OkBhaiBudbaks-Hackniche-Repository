export default function LearnMore() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600">ShopMart</a>
          <a href="/dashboard" className="text-lg font-semibold text-indigo-600 hover:underline">
            Start Shopping →
          </a>
        </div>
      </header>

      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold text-gray-900">Why Shop with ShopMart?</h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          We offer the best deals, fastest delivery, and a hassle-free shopping experience. Join thousands of happy customers today!
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-2xl font-semibold text-blue-600">Exclusive Discounts</h2>
          <p className="mt-4 text-gray-500">
            Enjoy unbeatable prices and special promotions on top brands.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-2xl font-semibold text-blue-600">Fast & Free Shipping</h2>
          <p className="mt-4 text-gray-500">
            Get your orders delivered to your doorstep quickly and at no extra cost.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-2xl font-semibold text-blue-600">Personalized Recommendations</h2>
          <p className="mt-4 text-gray-500">
            Find recommendations tailored to you preferences and search history.
          </p>
        </div>
      </section>

      <section className="text-center py-16 bg-blue-600 text-white">
        <h2 className="text-4xl font-bold">Ready to Start Shopping?</h2>
        <p className="mt-4 text-lg">Discover the latest trends and best deals today.</p>
        <a
          href="/dashboard"
          className="mt-6 inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100">Browse Products →
        </a>
      </section>
    </div>
  );
}
