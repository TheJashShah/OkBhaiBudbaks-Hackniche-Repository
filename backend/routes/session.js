import express from 'express';

const router = express.Router();

let loggedInUserEmail = null;
let cart = []; // Initialize the cart as an empty array

// Handle starting the session by storing the user's email
router.post('/start-session', (req, res) => {
  console.log('Received request at /start-session');
  const { email } = req.body;
  if (email) {
    console.log(`Email received: ${email}`);
    loggedInUserEmail = email;
    res.status(200).send({ message: 'User logged in successfully', email: loggedInUserEmail });
  } else {
    console.log('Email not provided');
    res.status(400).send({ message: 'Email is required' });
  }
});

// Handle adding items to the cart
router.post('/add-cart', (req, res) => {
  const { name, price } = req.body;
  if (name && price) {
    const item = { name, price, ID };
    cart.push(item); // Add the item to the cart
    console.log(`Item added to cart: ${JSON.stringify(item)}`);
    res.status(200).send({ message: 'Item added to cart', cart });
  } else {
    res.status(400).send({ message: 'Name and price are required' });
  }
});

router.get('/get-cart',(req, res) =>
{
  console.log('Received request at /get-cart');
  if (loggedInUserEmail) 
  {
    res.status(200).send({ cart: cart });
  } else {
    res.status(400).send({ message: 'No user logged in' });
  }
})

// Endpoint to get the logged-in user's email
router.get('/user', (req, res) => {
  if (loggedInUserEmail) {
    res.status(200).send({ email: loggedInUserEmail });
  } else {
    res.status(400).send({ message: 'No user logged in' });
  }
});

export default router;
