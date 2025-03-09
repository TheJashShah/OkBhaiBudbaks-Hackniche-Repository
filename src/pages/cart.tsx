import { useState,useEffect } from "react";
import axios from "axios";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Cart() {

  const [cartItems, setCartItems] = useState<any[]>([]); 

  // Fetch data from API and set items in cart
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/session/get-cart'); // API endpoint
        console.log(response.data); 

        const cartItems = response.data.cart;

        const formattedData: CartItem[] = cartItems.map((item:any, index:any) => ({
          id: index + 1, 
          name: item.name,
          price: parseFloat(item.price), 
          quantity: 1, 
        }));
  
        setCartItems(formattedData);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    fetchData();
  }, []);   

  // Update item quantity
  const updateQuantity = (id: number, amount: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Calculate subtotal
  const subtotal = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-indigo-600">ShopMart</a>
          <a href="/dashboard" className="text-lg font-semibold text-indigo-600 hover:underline">
            Continue Shopping →
          </a>
        </div>
      </header>

      {/* Cart Content */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {cartItems.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-3 py-1 bg-gray-200 rounded-md text-lg font-semibold">-
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-3 py-1 bg-gray-200 rounded-md text-lg font-semibold">+
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <h2 className="text-xl font-semibold">Subtotal: ₹{subtotal}</h2>
              <a
                href="/checkout"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500">
                Buy
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
            <p className="mt-4 text-gray-500">Browse our collection and add items to your cart.</p>
            <a
              href="/dashboard"
              className="mt-6 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-500">
              Shop Now
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
