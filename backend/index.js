import express from 'express'
import sequelize from './config/db.js';

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
