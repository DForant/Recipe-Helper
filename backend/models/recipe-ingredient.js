const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class RecipeIngredient extends Model {}

RecipeIngredient.init({
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: null
  },
  unit: {
    type: DataTypes.STRING(50),
    defaultValue: null
  }
}, {
  sequelize,
  modelName: 'RecipeIngredient',
  tableName: 'recipe_ingredients',
  timestamps: false,
  engine: 'MYISAM',
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

async function syncAndReturnModel() {
    await sequelize.sync(); // sync the model with the database
    return RecipeIngredient; // Return the RecipeIngredient model
}

// Export the model to be used in other parts of the application
module.exports = syncAndReturnModel;
