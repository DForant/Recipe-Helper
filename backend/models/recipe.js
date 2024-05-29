// Importing necessary modules from sequelize package
const { Model, DataTypes } = require('sequelize');
// Creating a new Sequelize instance with the database connection string
const sequelize = require('../config/db');

// Defining a new class 'Recipe' that extends Sequelize's Model class
class Recipe extends Model {}

// Initializing the model with its attributes and configurations
Recipe.init({
  // Defining the 'recipe_id' field as an integer, primary key, auto-incremented, and not nullable
  recipe_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  // Defining the 'title' field as a string with a maximum length of 255 characters and not nullable
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  // Defining the 'description' field as text, which can be null
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Defining the 'instructions' field as text, which can also be null
  instructions: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Defining the 'created_at' field with a default value of the current timestamp
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  // Associating this model with the previously created Sequelize instance
  sequelize, // Setting the model name as 'Recipe'
  modelName: 'Recipe', // Specifying the table name in the database to map to this model
  tableName: 'recipes', // Indicating that Sequelize should not automatically manage 'createdAt' and 'updatedAt' timestamps
  timestamps: false, // Specifying the database engine, which is 'MyISAM' in this case
  engine: 'MyISAM', // Setting the character set for the table to 'utf8mb4'
  charset: 'utf8mb4', // Setting the collation for the table to 'utf8mb4_0900_ai_ci'
  collate: 'utf8mb4_0900_ai_ci'
});

// Define an asynchronous function to sync the model with the database and return the model
async function syncAndReturnModel() {
    await sequelize.sync(); // Sync the model with the database
    return Recipe; // Return the Recipe model
  }

// Exporting the Recipe model to be used in other parts of the application
module.exports = syncAndReturnModel;
