const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('../config/db');

class Category extends Model {}

Category.init({
  // Model attributes are defined here
  category_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Category', // We need to choose the model name
  tableName: 'categories',
  timestamps: false,
  engine: 'MyISAM',
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

// Define an asynchronous function to sync the model with the database and return the model
async function syncAndReturnModel() {
  await sequelize.sync(); // Sync the model with the database
  return Category; // Return the Category model
}

// Export the function to be used in other parts of the application
module.exports = syncAndReturnModel;
