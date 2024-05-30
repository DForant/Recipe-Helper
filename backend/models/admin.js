// Import necessary modules from the sequelize package
const { Model, DataTypes } = require('sequelize');

// Import the sequelize instance configured in the db.js file
const sequelize = require('../config/db.js');

// Define a new class 'Admin' that extends the Sequelize Model class
class Admin extends Model {}

// Initialize the model with its attributes and options
Admin.init({
  // Define the 'admin_id' attribute as an integer, primary key, auto-incremented, and not nullable
  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  // Define the 'username' attribute as a string and not nullable
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Define the 'email' attribute as a string, not nullable, and must be a valid email format
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Validation to ensure the email attribute is a valid email
    },
  },
  // Define the 'password' attribute as a string and not nullable
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize, // Associate this model with the sequelize instance
  modelName: 'Admin', // Set the model name to 'Admin'
  tableName: 'admins', // Set the table name to 'admins'
  timestamps: false, // Disable automatic timestamp fields (createdAt, updatedAt)
  engine: 'MYISAM', // Set the storage engine for the table (if using MySQL)
  charset: 'utf8mb4', // Set the character set for the table
  collate: 'utf8mb4_0900_ai_ci', // Set the collation for the table
});

// Define an asynchronous function to sync the model with the database and return the model
async function syncAndReturnModel() {
    await sequelize.sync(); // Sync the model with the database
    return Admin; // Return the Admin model
}; 

// Export the function to be used in other parts of the application
module.exports = syncAndReturnModel;
