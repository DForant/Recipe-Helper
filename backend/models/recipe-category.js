const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class RecipeCategory extends Model {}

RecipeCategory.init({
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'RecipeCategory',
  tableName: 'recipe_categories',
  timestamps: false,
  engine: 'MyISAM',
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

// Define an asynchronous function to sync the model with the database and return the model
async function syncAndReturnModel() {
  await sequelize.sync(); // Sync the model with the database
  return RecipeCategory; // Return the Admin model
} 

module.exports = syncAndReturnModel;
