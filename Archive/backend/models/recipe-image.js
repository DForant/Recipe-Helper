// Importing necessary modules from sequelize package
const { Model, DataTypes } = require('sequelize'); // Importing Model and DataTypes classes from sequelize

// Importing the sequelize instance that is connected to your database
const sequelize = require('../config/db'); // Importing sequelize instance

// Defining a class that extends Model from Sequelize to represent the RecipeImage table
class RecipeImage extends Model {}

// Initializing the model with its fields and configurations
RecipeImage.init({
  // Defining the recipe_id column as an integer, not nullable, and as the primary key
  recipe_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  // Defining the image_url column as a string with a maximum length of 255 characters
  // It can be null, which is the default state
  image_url: {
    type: DataTypes.STRING(255),
    defaultValue: null
  }
}, {
  // Associating this model with the sequelize instance
  sequelize, // This is shorthand for sequelize: sequelize
  // Setting the name of the model
  modelName: 'RecipeImage', // Naming the model as 'RecipeImage'
  // Specifying the table name in the database
  tableName: 'recipe_images', // Specifying the table name as 'recipe_images'
  // Disabling the automatic timestamp columns (createdAt and updatedAt)
  timestamps: false, // Disabling timestamps for this model
  // Specifying the database engine
  engine: 'MyISAM', // Setting the engine to 'MyISAM'
  // Setting the character set for the table
  charset: 'utf8mb4', // Setting charset to 'utf8mb4'
  // Setting the collation for the table
  collate: 'utf8mb4_0900_ai_ci' // Setting collation
}); // Terminating semicolon added

// Define an asynchronous function to sync the model with the database and return the model
async function syncAndReturnModel() {
  await sequelize.sync(); // Sync the model with the database
  return RecipeImage; // Return the RecipeImage model
} // Terminating semicolon added

// Exporting the model to be used in other parts of the application
module.exports = syncAndReturnModel; // Exporting the syncAndReturnModel function
