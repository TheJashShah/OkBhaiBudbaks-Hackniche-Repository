import CartItem from '../models/cartItem.js';
import express from "express";
const router = express.Router();

router.post('/api/session/add-cart', async (req, res) => {
    const { name, price, email } = req.body;
  
    if (!name || !price || !email) {
      return res.status(400).json({ message: 'Missing required fields: name, price, email' });
    }
  
    try {
      const newItem = new CartItem({
        name,
        price,
        email
      });
  
      await newItem.save();
  
      res.status(201).json({ message: 'Item added to cart', item: newItem });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
  });

  export default router;