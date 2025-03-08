import express from 'express';

const router = express.Router();

let loggedInUserEmail = null;

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

// Endpoint to get the logged-in user's email
router.get('/user', (req, res) => {
  if (loggedInUserEmail) {
    res.status(200).send({ email: loggedInUserEmail });
  } else {
    res.status(400).send({ message: 'No user logged in' });
  }
});

export default router;
