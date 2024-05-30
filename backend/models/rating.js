// Importing the necessary modules from sequelize
const { Model, DataTypes } = require('sequelize');
// Importing the database configuration from the db config file
const sequelize = require('../config/db');

// Defining the Rating class which extends the Sequelize Model class
class Rating extends Model {}

// Initializing the Rating model with its attributes and options
Rating.init({
  // Defining the rating_id attribute as an integer, primary key, auto-incremented, and not nullable
  rating_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  // Defining the user_id attribute as an integer, not nullable, and referencing the users table
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Reference to the users model
      key: 'id', // The column in the users model that is being referenced
    }
  },
  // Defining the recipe_id attribute as an integer, not nullable, and referencing the recipes table
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'recipes', // Reference to the recipes model
      key: 'id', // The column in the recipes model that is being referenced
    }
  },
  // Defining the rating attribute as a decimal, not nullable, and with validation rules
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    validate: {
      isDecimal: true, // Validates that the value is a decimal
      min: 0.00, // Minimum allowed value for the rating
      max: 5.00 // Maximum allowed value for the rating
    }
  }
}, {
  sequelize, // Associating this model with the sequelize instance
  modelName: 'Rating', // Naming the model 'Rating'
  tableName: 'ratings', // Specifying the table name in the database
  timestamps: false, // Disabling the automatic timestamps
  engine: 'MYISAM', // Specifying the storage engine (if using MySQL)
  charset: 'utf8mb4', // Setting the charset for the table
  collate: 'utf8mb4_0900_ai_ci' // Setting the collation for the table
});

// Define an asynchronous function to sync the model with the database and return the model
async function syncAndReturnModel() {
    await sequelize.sync(); // Sync the model with the database
    return Rating; // Return the Rating model
}

// Exporting the syncAndReturnModel function for use in other files
module.exports = syncAndReturnModel;
