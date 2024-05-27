// db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('recipe-helper', 'db_deano', 'F@52z147dea', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;
