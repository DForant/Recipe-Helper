// Importing the Model and DataTypes classes from the sequelize package
const { Model, DataTypes } = require('sequelize');
// Importing the sequelize instance configured in the db.js file within the config directory
const sequelize = require('../config/db');

// Defining the User class which extends the Model class from sequelize
class User extends Model {}

// Initializing the User model with its schema and configuration
User.init({
  // user_id is the primary key, auto-incremented, and cannot be null
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  // username is a string and cannot be null
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // email is a string and cannot be null
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // password is a string and cannot be null
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize, // Associating this model with the sequelize instance
  modelName: 'User', // Naming the model
  tableName: 'users', // Defining the table name
  timestamps: false, // Disabling the automatic timestamps
  engine: 'MyISAM', // Setting the storage engine for MySQL
  charset: 'utf8mb4', // Setting the character set to support emojis
  collate: 'utf8mb4_0900_ai_ci', // Setting the collation for character set
});

// Define an asynchronous function to sync the model with the database and return the model
async function syncAndReturnModel() {
    await sequelize.sync(); // Sync the model with the database
    return User; // Return the User model
}

// Exporting the function that syncs the model and returns it
module.exports = syncAndReturnModel;
