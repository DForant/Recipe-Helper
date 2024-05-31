const express = require('express'); // Import express module
const syncAndReturnModel = require('../models/user'); // Import user model synchronization function
const router = express.Router(); // Create a new router object
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation

// Wrap the model synchronization in an async function
let User; // Declare a variable to hold the User model
syncAndReturnModel().then(model => {
  User = model; // Assign the synchronized model to User
}).catch(error => {
  console.error('Failed to sync the User model:', error); // Log any errors during synchronization
});

// Registration endpoint
router.post('/register', async (req, res) => {
  // Ensure User model is available
  if (!User) return res.status(500).send('Server is not ready');

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the user's password

    // Create a new user instance
    const newUser = await User.create({
      username: req.body.username, // Set the username
      email: req.body.email, // Set the email
      password: hashedPassword, // Set the hashed password
    });

    // Respond with the created user (excluding the password)
    res.status(201).json({
      user_id: newUser.user_id, // Include the user ID
      username: newUser.username, // Include the username
      email: newUser.email, // Include the email
    });
  } catch (error) {
    res.status(500).send(error.message); // Send error message if there's an exception
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  // Ensure User model is available
  if (!User) return res.status(500).send('Server is not ready');

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username: req.body.username } }); // Query the User model for the username

    // Check if user exists and the password is correct
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      // Create a token
      const token = jwt.sign(
        { user_id: user.user_id }, // Payload is the user ID
        '72fd3c3442747169943d4ce92b6d8263636151fc', // Secret key
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      // Respond with the token
      res.json({ token }); // Send the token in the response
    } else {
      res.status(401).send('Invalid credentials'); // Send error if credentials are invalid
    }
  } catch (error) {
    res.status(500).send(error.message); // Send error message if there's an exception
  }
});

module.exports = router; // Export the router
