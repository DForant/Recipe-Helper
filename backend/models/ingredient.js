// Import necessary modules from 'sequelize'
const { Model, DataTypes } = require('sequelize'); // Destructure Model and DataTypes from sequelize
const sequelize = require('../config/db'); // Import the sequelize instance

// Define the Ingredient model by extending the Model class
class Ingredient extends Model {}

// Initialize the Ingredient model with its schema and configuration
Ingredient.init({
  ingredient_id: {
    type: DataTypes.INTEGER, // Specify the data type as integer
    primaryKey: true, // Mark as primary key
    autoIncrement: true, // Enable auto increment
    allowNull: false // Disallow null values
  },
  name: {
    type: DataTypes.STRING, // Specify the data type as string
    allowNull: false // Disallow null values
  }
}, {
  sequelize, // Associate the sequelize instance
  modelName: 'Ingredient', // Define the model name
  tableName: 'ingredients', // Specify the table name in the database
  timestamps: false, // Disable automatic timestamp fields (createdAt, updatedAt)
  underscored: true, // Use snake_case for column names
  charset: 'utf8mb4', // Set character set to utf8mb4
  collate: 'utf8mb4_0900_ai_ci' // Set collation for case-insensitive and accent-insensitive comparisons
}); // Terminate with a semicolon

// Define an asynchronous function to sync the model with the database and return the model
async function syncAndReturnModel() {
  await sequelize.sync(); // Sync the model with the database
  return Ingredient; // Return the Ingredient model
}; // Terminate with a semicolon

// Export the syncAndReturnModel function
module.exports = syncAndReturnModel; // Terminate with a semicolon
