// Importing the necessary modules from sequelize
const { Model, DataTypes } = require('sequelize');
// Importing the database configuration
const sequelize = require('../config/db');

// Defining the UserRecipe class which extends Model
class UserRecipe extends Model {}

// Initializing the UserRecipe model with its properties
UserRecipe.init({
  // Defining the user_id as an integer, not allowing null values, and setting it as a primary key
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  // Defining the recipe_id in the same way as user_id
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize, // Associating this model with the sequelize instance
  modelName: 'UserRecipe', // Naming the model
  tableName: 'user_recipes', // Defining the table name
  timestamps: false, // Disabling the automatic timestamps
  engine: 'MyISAM', // Setting the storage engine
  charset: 'utf8mb4', // Setting the character set
  collate: 'utf8mb4_0900_ai_ci', // Setting the collation
});

// Function to sync the model with the database and return the model
async function syncAndReturnModel() {
    await sequelize.sync();  // Sync the model with the database
    return UserRecipe; // Return the UserRecipe model
}

// Exporting the UserRecipe model
module.exports = UserRecipe;
