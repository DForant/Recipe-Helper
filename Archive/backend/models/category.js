// Importing necessary modules from sequelize
const { Model, DataTypes } = require('sequelize');
// Importing the database configuration
const sequelize = require('../config/db.js');

// Defining a new class 'Category' that extends Sequelize's Model class
class Category extends Model {}

// Initializing the 'Category' model with its properties and configurations
Category.init({
  // Defining the 'category_id' field as an integer, primary key, auto-incremented, and not nullable
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  // Defining the 'name' field as a string and not nullable
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize, // Associating this model with the sequelize instance (database connection)
  modelName: 'Category', // Naming the model 'Category'
  tableName: 'categories', // Specifying the table name in the database
  timestamps: false, // Disabling automatic timestamp fields (createdAt, updatedAt)
  engine: 'MyISAM', // Setting the storage engine (if using MySQL)
  charset: 'utf8mb4', // Setting the character set for the table
  collate: 'utf8mb4_0900_ai_ci', // Setting the collation for the table
});

// Define an asynchronous function to sync the model with the database and return the model
async function syncAndReturnModel() {
  await sequelize.sync(); // Sync the model with the database to ensure it's up to date
  return Category; // Return the Category model for use elsewhere in the application
}; 

// Exporting the function to be used in other parts of the application
module.exports = syncAndReturnModel;
