// Import the sequelize instance from the db configuration file
const sequelize = require('../config/db');

// Describe block defines a test suite for the database connection
describe('Database Connection', () => {
  
  // 'it' block defines an individual test case
  it('should connect to the database successfully', async () => {
    // expect statement checks that the sequelize authentication promise resolves without throwing an error
    await expect(sequelize.authenticate()).resolves.not.toThrow();
  });

  // afterAll hook is used for cleanup after all tests in this suite have been run
  afterAll(async () => {
    // Close the sequelize connection
    await sequelize.close();
  });
});
