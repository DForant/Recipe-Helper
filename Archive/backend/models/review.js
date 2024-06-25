// Importing Sequelize Model and DataTypes
const { Model, DataTypes } = require('sequelize');
// Importing the database configuration
const sequelize = require('../config/db');

// Defining the Review model which extends Sequelize Model
class Review extends Model {}

// Initializing the Review model with its attributes and options
Review.init({
  // Unique identifier for each review
  review_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  // Reference to the user who wrote the review
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users', // Reference to the 'users' table
      key: 'id', // The 'id' field in the 'users' table
    },
  },
  // Reference to the recipe being reviewed
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'recipes', // Reference to the 'recipes' table
      key: 'id', // The 'id' field in the 'recipes' table
    },
  },
  // Text content of the review
  review_text: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // Timestamp for when the review was created
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize, // Database connection instance
  modelName: 'Review', // Name of the model
  tableName: 'reviews', // Table name in the database
  timestamps: false, // Disabling automatic timestamp fields
  engine: 'MYISAM', // Database storage engine
  charset: 'utf8mb4', // Character set for the table
  collate: 'utf8mb4_0900_ai_ci', // Collation setting for the table
});

// Function to sync the model with the database and return the model
async function syncAndReturnModel() {
  await sequelize.sync(); // Sync the model with the database
  return Review; // Return the Review model
}

// Exporting the syncAndReturnModel function
module.exports = syncAndReturnModel;
