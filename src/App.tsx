import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Hero from './pages/hero'
import Learn from './pages/learn-more'
import Cart from './pages/cart'
import User from './pages/user'
import Checkout from './pages/checkout'
import Userdetails from './pages/userDetails'
import ProductDetail from "./pages/product-detail"
import { CartProvider } from "./context/cartContext"

function App() {
  return (
    <>
    <div>
    <CartProvider>
     <Router>
        <Routes>
           <Route path="/" element={<Hero />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/login" element={<Login />} />
           <Route path="/dashboard" element={<Dashboard />} />           
           <Route path="/learn" element={<Learn />} />
           <Route path="/product/:id" element={<ProductDetail />} />
           <Route path="/cart" element={<Cart />} />
           <Route path="/user" element={<User />} />
           <Route path="/checkout" element={<Checkout />} />
           <Route path="/userdetails" element={<Userdetails />} />
        </Routes>
      </Router>
      </CartProvider>
    </div>
    </>
  )
}

export default App