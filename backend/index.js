// Require the Express module for web application framework;
const express = require('express');
// Require the sequelize instance configured for the database;
const sequelize = require('./config/db.js');

// Initialize the Express application;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Require the userRoutes module
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes'); 

// routes
app.use('/api/users', userRoutes);  // Users
app.use('/api', recipeRoutes); // Recipes


// Function to test the database connection;
const testDatabaseConnection = async () => {
  try {
    // Attempt to authenticate with the database;
    await sequelize.authenticate();
    // Log success message if connection is established;
    console.log('Database connection has been established successfully.');
  } catch (error) {
    // Log error message if connection fails;
    console.error('Unable to connect to the database:', error);
  }
};

// Execute the function to test the database connection;
testDatabaseConnection();

// Define the port number for the server to listen on;
const port = 3000; // Choose any available port;

// Define a GET route for the root path;
app.get('/', (req, res) => {
  // Send a response when the root path is accessed;
  res.send('Hello, Express!');
});

// Start the server and listen on the specified port;
app.listen(port, () => {
  // Log the server running status with the URL;
  console.log(`Server running at http://localhost:${port}`);
});

// If there are exports, they would be converted like this:
// module.exports = { exportedFunction, exportedVariable };
