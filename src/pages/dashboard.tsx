import React, { useState,useEffect } from "react";
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "Clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: 4.8,
    stock: 120
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "Clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: 4.1,
    stock: 259
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
    category: "Clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: 4.7,
    stock: 500
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "Clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: 3.9,
    stock: 430
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "Jewelry",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: 4.6,
    stock: 70
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave",
    price: 168,
    description: "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "Jewelry",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: 3.9,
    stock: 123
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: "Jewelry",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: 3.0,
    stock: 400
  },
  {
    id: 8,
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: "Jewelry",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    rating: 4.2,
    stock: 100
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    price: 64,
    description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7",
    category: "Electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: 4.8,
    stock: 203
  },
  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description: "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5 hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores)",
    category: "Electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: 4.6,
    stock: 470
  },
  {
    id: 11,
    title: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 109,
    description: "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance.",
    category: "Electronics",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: 4.8,
    stock: 319
  },
  {
    id: 12,
    title: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 114,
    description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: "Electronics",
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    rating: 4.8,
    stock: 400
  },
  {
    id: 13,
    title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    price: 599,
    description: "21.5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design",
    category: "Electronics",
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    rating: 4.5,
    stock: 250
  },
  {
    id: 14,
    title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
    price: 999.99,
    description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration",
    category: "Electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    rating: 4.7,
    stock: 140
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description: "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece.",
    category: "Clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: 4.4,
    stock: 235
  },
  {
    id: 16,
    title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description: "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front",
    category: "Clothing",
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    rating: 4.0,
    stock: 340
  },
  {
    id: 17,
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    price: 39.99,
    description: "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets",
    category: "Clothing",
    image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    rating: 3.8,
    stock: 679
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V",
    price: 9.85,
    description: "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline",
    category: "Clothing",
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    rating: 4.2,
    stock: 130
  },
  {
    id: 19,
    title: "Opna Women's Short Sleeve Moisture",
    price: 7.95,
    description: "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric",
    category: "Clothing",
    image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    rating: 4.3,
    stock: 146
  },
  {
    id: 20,
    title: "DANVOUY Womens T Shirt Casual Cotton Short",
    price: 12.99,
    description: "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch.",
    category: "Clothing",
    image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    rating: 3.6,
    stock: 145
  }
];


const Dashboard = () => {
   const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
   const handleProductClick = () => {

    // Increase loyalty points
    setLoyaltyPoints((prevPoints) => {
      const newPoints = prevPoints + 10; // Each click gives 10 points
      localStorage.setItem("loyaltyPoints", newPoints.toString()); // Save to localStorage
      return newPoints;
    });
    
  };

  const [extraFilter,setExtraFilter] = useState('');
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [popular, setPopular] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/topproducts");
        console.log(response);
        if (response.data && typeof response.data === "string") {
          console.log("here");
          const sanitizedData = response.data.replace(/NaN/g, 'null').replace(/Infinity/g, 'null');
          const parsedData = JSON.parse(sanitizedData);
          console.log(parsedData);
          if (parsedData["top-products"] && Array.isArray(parsedData["top-products"])) {
            console.log("✅ API Response:", parsedData["top-products"]);
            setPopular(parsedData["top-products"]); // Set the 'top-products' array
          } else {
            console.warn("⚠️ 'top-products' is missing or not an array.");
            setPopular([]); // Default to empty array
          }
        } else {
          console.warn("⚠️ Unexpected API response format.");
          setPopular([]); // Default to empty array
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        setPopular([]); // Ensure that the state is reset on error
      }
    };

    fetchData();
  }, []);
  const handleAddToCart = async (name: string, price: number) => {
    console.log(`Adding to cart: ${name} - $${price}`);
    try {
      // Send POST request with title and price
      const response = await axios.post('http://localhost:3000/api/session/add-cart', {
        name,
        price,
      });
      // Handle success message display
      const successMessage = document.getElementById("success-message");
      if (successMessage) {
        successMessage.classList.remove("opacity-0");
        successMessage.classList.add("opacity-100");
  
        // Hide message after 3 seconds
        setTimeout(() => {
          successMessage.classList.remove("opacity-100");
          successMessage.classList.add("opacity-0");
        }, 3000);
      }
  
      // Log success response from backend
      console.log('Item added to cart:', response.data);
  
    } catch (error: any) {
      // If error occurs, log it and display a user-friendly message
      console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
  
      // Optionally, show an error message to the user
      const errorMessage = document.getElementById("error-message");
      if (errorMessage) {
        errorMessage.classList.remove("opacity-0");
        errorMessage.classList.add("opacity-100");
  
        // Hide error message after 3 seconds
        setTimeout(() => {
          errorMessage.classList.remove("opacity-100");
          errorMessage.classList.add("opacity-0");
        }, 3000);
      }
    }
  }
  
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);
  
  // Get recommended products (could be based on user preferences, using random for demo)
  const recommendedProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 6);

  return (
    
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <div
        id="success-message"
        className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 transition-opacity duration-300 opacity-0"
      >
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>Added to cart successfully!</span>
        </div>
      </div>
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white p-4 md:p-6 shadow-lg flex flex-col items-center md:items-start border-r border-gray-200 z-10">
        <div className="flex items-center justify-center md:justify-start w-full">
          <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <h1 className="text-xl font-bold text-blue-600 ml-2 md:block hidden">Best<span className="text-gray-800">BuyCo</span></h1>
        </div>
        
        <nav className="mt-8 space-y-2 w-full">
          <button
            className={`w-full p-3 rounded-lg flex items-center justify-center md:justify-start font-medium transition-all ${
              activeTab === 'explore' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('explore')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="hidden md:block">Explore</span>
          </button>
          
          <button
            className={`w-full p-3 rounded-lg flex items-center justify-center md:justify-start font-medium transition-all ${
              activeTab === 'popular' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('popular')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="hidden md:block">Popular</span>
          </button>
          
          <button
            className={`w-full p-3 rounded-lg flex items-center justify-center md:justify-start font-medium transition-all ${
              activeTab === 'foryou' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('foryou')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="hidden md:block">For You</span>
          </button>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <Link to="/cart" className="w-full p-3 rounded-lg flex items-center justify-center md:justify-start font-medium text-gray-700 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden md:block">Cart</span>
            </Link>
            
            <Link to="/profile" className="w-full p-3 rounded-lg flex items-center justify-center md:justify-start font-medium text-gray-700 hover:bg-gray-100 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden md:block">Profile</span>
            </Link>
          </div>
        </nav>
        
        <div className="mt-auto mb-4 w-full hidden md:block">
          <Link to="/settings" className="w-full p-3 rounded-lg flex items-center font-medium text-gray-700 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className="bg-white p-4 shadow-sm flex items-center justify-between border-b border-gray-200">
  <h2 className="text-xl font-bold text-gray-800">
    {activeTab === "explore" && "Explore Products"}
    {activeTab === "popular" && "Popular Products"}
    {activeTab === "foryou" && "Recommended For You"}
  </h2>

  {/* Search & Additional Input (Desktop) */}
  <div className="relative w-full max-w-xl hidden md:flex items-center space-x-3">
    {/* Search Input */}
    <div className="relative flex-1">
      <input
        type="text"
        className="w-full h-10 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400 absolute left-4 top-2.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    {/* Additional Input */}
    <div className="relative flex-1">
    <input
      type="text"
      className="w-full h-10 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Smart Search"
      value={extraFilter}
      onChange={(e) => setExtraFilter(e.target.value)}
    />
    </div>
    <button className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
      Search</button>
  </div>

  {/* Icons */}
  <div className="flex items-center space-x-4">
    <button className="relative p-2 rounded-full hover:bg-gray-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
      </svg>
    </button>
  </div>
</div>

{/* Mobile Search & Additional Input */}
<div className="p-4 bg-white border-b border-gray-200 md:hidden">
  <div className="flex flex-col space-y-2">
    {/* Search Input */}
    <div className="relative">
      <input
        type="text"
        className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    {/* Additional Input */}
    <input
      type="text"
      className="w-full h-10 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Smart Search"
      value={extraFilter}
      onChange={(e) => setExtraFilter(e.target.value)}
    />
  </div>
</div>


        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {/* If search is active, show search results */}
          {searchQuery && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h3>
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No products found matching "{searchQuery}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="group">
                      <Card
                        variant="outlined"
                        onClick={() => handleProductClick()}
                        className="h-full transition-all duration-200 hover:shadow-md group-hover:border-blue-300"
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: 'primary.main',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          },
                        }}
                      >
                        <AspectRatio ratio="1" sx={{ width: '100%' }}>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            className="object-contain p-4"
                          />
                        </AspectRatio>
                        <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography level="title-md" className="line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                            {product.title}
                          </Typography>
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                          </div>
                          <Typography level="body-sm" className="text-gray-500 mb-2">
                            {product.category}
                          </Typography>
                          <div className="mt-auto">
                            <Typography level="title-lg" className="font-bold text-blue-600">
                              ${product.price.toFixed(2)}
                            </Typography>
                          </div>
                        </Box>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'explore' && !searchQuery && (
            <>
              {/* Featured section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Featured Products</h3>
                  <Link to="/category/featured" className="text-sm text-blue-600 hover:underline">View all</Link>
                </div>     
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    py: 1,
                    overflow: 'auto',
                    width: '100%',
                    scrollSnapType: 'x mandatory',
                    '& > *': {
                      scrollSnapAlign: 'center',
                      flexShrink: 0,
                    },
                    '::-webkit-scrollbar': { height: '6px' },
                    '::-webkit-scrollbar-thumb': { 
                      backgroundColor: 'rgba(0,0,0,0.2)', 
                      borderRadius: '10px',
                    },
                  }}
                  className="pb-4">
                  {featuredProducts.map((product) => (
                      <Card
                        variant="outlined"
                        sx={{
                          width: {
                            xs: 220,
                            sm: 250,
                            md: 280,
                          },
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: 'primary.main',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          },
                        }}
                        className="h-full transition-all duration-200 hover:shadow-md group-hover:border-blue-300">
                        <AspectRatio ratio="1" sx={{ width: '100%' }}>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            className="object-contain p-4"/>
                        </AspectRatio>
                        <Box sx={{ p: 2 }}>
                          <Typography level="title-md" className="line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {product.title}
                          </Typography>
                          <div className="flex items-center my-1">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                viewBox="0 0 20 20" 
                                fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <Typography level="title-lg" className="font-bold text-blue-600">
                            ${product.price.toFixed(2)}
                          </Typography>
                          <button className="flex-1 my-4 bg-blue-600 text-white py-3 px-5 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center">Add to Cart</button>
                        </Box>
                      </Card>
                  ))}
                </Box>
              </div>
              
              {/* Categories section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop by Category</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {['Electronics', 'Clothing', 'Jewelry', 'Home & Kitchen', 'Beauty', 'Sports'].map((category, index) => (
                    <Link to={`/category/${category.toLowerCase()}`} key={index} className="group">
                      <div className="bg-white rounded-lg border border-gray-200 p-4 text-center transition-all hover:shadow-md hover:border-blue-300 h-full flex flex-col items-center justify-center">
                        <div className="w-12 h-12 mb-3 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          {index === 0 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          )}
                          {index === 1 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          )}
                          {index === 2 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          )}
                          {index === 3 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          )}
                          {index === 4 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                          )}
                          {index === 5 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{category}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* New arrivals section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">New Arrivals</h3>
                  <Link to="/category/new" className="text-sm text-blue-600 hover:underline">View all</Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.slice(6, 14).map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="group">
                      <Card
                        variant="outlined"
                        className="h-full transition-all duration-200 hover:shadow-md group-hover:border-blue-300"
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: 'primary.main',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          },
                        }}
                      >
                        <AspectRatio ratio="1" sx={{ width: '100%' }}>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            className="object-contain p-4"
                          />
                        </AspectRatio>
                        <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Typography level="title-md" className="line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                            {product.title}
                          </Typography>
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                          </div>
                          <Typography level="body-sm" className="text-gray-500 mb-2">
                            {product.category}
                          </Typography>
                          <div className="mt-auto flex items-center justify-between">
                            <Typography level="title-lg" className="font-bold text-blue-600">
                              ${product.price.toFixed(2)}
                            </Typography>
                            <button className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </Box>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'popular' && !searchQuery && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {popular.map((product, index) => (
                <Link to={`/product/${product.ID}`} key={`${product.ID}-${index}`} className="group">
                    <Card
                      variant="outlined"
                      className="h-full transition-all duration-200 hover:shadow-md group-hover:border-blue-300"
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        },
                      }}
                    >
                      <AspectRatio ratio="1" sx={{ width: '100%' }}>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="object-contain p-4"
                        />
                      </AspectRatio>
                      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full w-fit mb-2">
                          Popular
                        </div>
                        <Typography level="title-md" className="line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </Typography>
                        <div className="flex items-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-4 w-4 ${i < Math.floor(product.Rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({product.Rating})</span>
                        </div>
                        
                      </Box>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'foryou' && !searchQuery && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended For You</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recommendedProducts.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id} className="group">
                    <Card
                      variant="outlined"
                      className="h-full transition-all duration-200 hover:shadow-md group-hover:border-blue-300"
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        },
                      }}
                    >
                      <AspectRatio ratio="1" sx={{ width: '100%' }}>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          className="object-contain p-4"
                        />
                      </AspectRatio>
                      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full w-fit mb-2">
                          Recommended
                        </div>
                        <Typography level="title-md" className="line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                          {product.title}
                        </Typography>
                        <div className="flex items-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                        </div>
                        <Typography level="body-sm" className="text-gray-500 mb-2">
                          {product.category}
                        </Typography>
                        <div className="mt-auto flex items-center justify-between">
                          <Typography level="title-lg" className="font-bold text-blue-600">
                            ${product.price.toFixed(2)}
                          </Typography>
                          <button className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </Box>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
