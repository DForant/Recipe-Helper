// Importing necessary classes from sequelize package
const { Model, DataTypes } = require('sequelize'); // Import Model and DataTypes
const sequelize = require('../config/db'); // Import sequelize instance

// Define RecipeIngredient class that extends Model to represent 'recipe_ingredients' table
class RecipeIngredient extends Model {}

// Initialize RecipeIngredient model with its fields and configurations
RecipeIngredient.init({
  // Define 'recipe_id' as a primary key, integer type, not nullable
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  // Define 'ingredient_id' as a primary key, integer type, not nullable
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  // Define 'quantity' as a decimal type with precision and scale, can be null
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: null
  },
  // Define 'unit' as a string type with a maximum length of 50 characters, can be null
  unit: {
    type: DataTypes.STRING(50),
    defaultValue: null
  }
}, {
  sequelize, // Associate the model with the sequelize instance
  modelName: 'RecipeIngredient', // Set the model name
  tableName: 'recipe_ingredients', // Set the table name
  timestamps: false, // Disable automatic timestamp columns
  engine: 'MYISAM', // Set the database engine
  charset: 'utf8mb4', // Set the character set
  collate: 'utf8mb4_0900_ai_ci' // Set the collation
}); // Add terminating semicolon

// Define an asynchronous function to sync the model with the database and return the model
async function syncAndReturnModel() {
  await sequelize.sync(); // Sync the model with the database
  return RecipeIngredient; // Return the RecipeIngredient model
} // Add terminating semicolon

// Export the model to be used in other parts of the application
module.exports = syncAndReturnModel; // Export syncAndReturnModel function
