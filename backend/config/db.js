// Import the Sequelize constructor from the sequelize package
const Sequelize = require('sequelize');

// Import the dotenv package to manage environment variables
const dotenv = require('dotenv');

// Call the config function on dotenv to load the environment variables from the .env file
dotenv.config();

// Create a new Sequelize instance, connecting to the database using the environment variables
const sequelize = new Sequelize(process.env.DB_NAME, // Database name
                                process.env.DB_USER, // Database username
                                process.env.DB_PASSWORD, // Database password
                                {
  host: process.env.DB_HOST, // Database host
  port: process.env.DB_PORT, // Database port
  dialect: 'mysql' // The dialect of the database you are connecting to (in this case, MySQL)
});

// Export the sequelize instance to be used in other parts of the application
module.exports = sequelize;
