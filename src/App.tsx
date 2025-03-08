import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Hero from './pages/hero'
import Learn from './pages/learn-more'
import Cart from './pages/cart'

function App() {
  return (
    <>
      <div>
     <Router>
        <Routes>
           <Route path="/signup" element={<Signup />} />
           <Route path="/login" element={<Login />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/" element={<Hero />} />
           <Route path="/learn" element={<Learn />} />
           <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App