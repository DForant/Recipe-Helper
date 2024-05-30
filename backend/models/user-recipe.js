const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class UserRecipe extends Model {}

UserRecipe.init({
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'UserRecipe',
  tableName: 'user_recipes',
  timestamps: false,
  engine: 'MyISAM',
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

async function syncAndReturnModel(){
    sequelize.sync()  // Sync the model with the database
    return UserRecipe // Return the UserRecipe model
}

module.exports = UserRecipe;
