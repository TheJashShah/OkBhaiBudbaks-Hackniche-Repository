import { useState } from "react";

const navigation = [
  { name: "Products", href: "/dashboard" },
  { name: "Features", href: "#" },
  { name: "Cart", href: "/cart" },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="text-xl font-bold text-blue-600">
              ShopMart
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-700 p-2 rounded-md">☰
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/login" className="text-sm font-semibold text-gray-900">
              Log in →
            </a>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white p-6">
            <div className="flex items-center justify-between">
              <a href="/" className="text-xl font-bold text-blue-600">
                ShopMart
              </a>
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-700 p-2">✕
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="block text-lg font-semibold text-gray-900">
                  {item.name}
                </a>
              ))}
              <a href="/login" className="block text-lg font-semibold text-gray-900">
                Log in
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="relative px-6 pt-20 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Elevate Your Shopping Experience
          </h1>
          <p className="mt-8 text-lg text-gray-500 sm:text-xl">
            Discover exclusive deals and shop with confidence. Fast, secure, and hassle-free.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <a
              href="/dashboard"
              className="rounded-md bg-blue-600 px-5 py-3 text-white text-lg font-semibold shadow-lg hover:bg-blue-500">
              Start Shopping
            </a>
            <a href="/learn" className="text-lg font-semibold text-gray-900">
              Learn more →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
