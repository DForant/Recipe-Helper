const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Rating extends Model {}

Rating.init({
  rating_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // This is a reference to another model
      key: 'id', // This is the column name of the referenced model
    }
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'recipes', // This is a reference to another model
      key: 'id', // This is the column name of the referenced model
    }
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    validate: {
      isDecimal: true, // validates if the value is a decimal
      min: 0.00, // minimum allowed value
      max: 5.00 // maximum allowed value
    }
  }
}, {
  sequelize,
  modelName: 'Rating',
  tableName: 'ratings',
  timestamps: false, // assuming you don't want timestamps in this table
  engine: 'MYISAM', // specifying the storage engine
  charset: 'utf8mb4', // specifying the charset
  collate: 'utf8mb4_0900_ai_ci' // specifying the collation
});

// Define an asynchronous function to sync the model with the database and return the model
async function syncAndReturnModel() {
    await sequelize.sync(); // Sync the model with the database
    return Rating; // Return the Recipe model
}

module.exports = syncAndReturnModel;
