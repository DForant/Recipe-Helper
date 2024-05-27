import express from 'express'
import sequelize from './config/db.js';

const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Call the function to test the connection
testDatabaseConnection();

const app = express();
const port = 3000; // Choose any available port

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
