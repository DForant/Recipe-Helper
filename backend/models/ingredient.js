// Import necessary modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming this file exists and configures the database connection

// Define the Ingredient model
class Ingredient extends Model {}

Ingredient.init({
  ingredient_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Ingredient',
  tableName: 'ingredients', // Specify the table name in the database
  timestamps: false, // Disable automatic timestamp fields (createdAt, updatedAt)
  underscored: true, // Use snake_case for column names
  charset: 'utf8mb4', // Set character set to utf8mb4
  collate: 'utf8mb4_0900_ai_ci' // Set collation for case-insensitive and accent-insensitive comparisons
});

// Define an asynchronous function to sync the model with the database and return the model
async function syncAndReturnModel() {
  await sequelize.sync(); // Sync the model with the database
  return Ingredient; // Return the Ingredient model
}

module.exports = syncAndReturnModel;
