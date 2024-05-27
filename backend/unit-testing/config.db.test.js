// db.test.js
const sequelize = require('../config/db');

describe('Database Connection', () => {
  it('should connect to the database successfully', async () => {
    await expect(sequelize.authenticate()).resolves.not.toThrow();
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
