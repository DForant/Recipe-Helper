const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');


class Admin extends Model {}

Admin.init({
  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Admin',
  tableName: 'admins',
  timestamps: false,
  engine: 'MYISAM',
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci'
});

async function syncAndReturnModel() {
    await sequelize.sync();
    return Admin;
  } 

module.exports = syncAndReturnModel;
