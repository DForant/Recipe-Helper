// Importing the Model and DataTypes classes from sequelize
const { Model, DataTypes } = require('sequelize');
// Importing the sequelize instance from the database configuration file
const sequelize = require('../config/db');

// Defining the RecipeCategory class which extends the Model class from sequelize
class RecipeCategory extends Model {}

// Initializing the RecipeCategory model with its attributes and options
RecipeCategory.init({
  // Defining the recipe_id attribute as an integer, not nullable, and as a primary key
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  // Defining the category_id attribute as an integer, not nullable, and as a primary key
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  sequelize, // Associating this model with the sequelize instance
  modelName: 'RecipeCategory', // Naming the model 'RecipeCategory'
  tableName: 'recipe_categories', // Specifying the table name in the database
  timestamps: false, // Indicating that this model does not use automatic timestamp fields
  engine: 'MyISAM', // Specifying the storage engine (if using MySQL)
  charset: 'utf8mb4', // Setting the charset for the table
  collate: 'utf8mb4_0900_ai_ci' // Setting the collation for the table
});

// Define an asynchronous function to sync the model with the database and return the model
async function syncAndReturnModel() {
  await sequelize.sync(); // Sync the model with the database
  return RecipeCategory; // Return the RecipeCategory model
}; 

// Exporting the syncAndReturnModel function for use in other files
module.exports = syncAndReturnModel;
