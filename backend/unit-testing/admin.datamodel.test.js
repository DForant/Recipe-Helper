// Import the function to sync and return the Admin model from the admin model file
const syncAndReturnModel  = require('../models/admin');
// Import the sequelize instance from the database configuration file
const sequelize = require('../config/db');

// Declare a variable to hold the Admin model, which will be assigned before all tests run
let Admin;

// beforeAll hook runs before all the tests in this describe block
beforeAll(async () => {
  // Assign the Admin model by calling the syncAndReturnModel function
  Admin = await syncAndReturnModel();
  // Sync the database, forcing it to drop and recreate tables based on the model definitions
  await sequelize.sync({ force: true });
});

// afterAll hook runs after all the tests in this describe block
afterAll(async () => {
  // Close the sequelize connection to the database
  await sequelize.close();
});

// Describe block defines a test suite for the Admin model
describe('Admin Model', () => {
  // 'it' block defines an individual test case
  it('should create a new admin', async () => {
    // Define the data for creating a new admin
    const adminData = {
      username: 'testAdmin',
      email: 'test@admin.com',
      password: 'securePassword123'
    };

    // Create a new admin record in the database using the Admin model and the test data
    const admin = await Admin.create(adminData);
    // Expect statements to check if the created admin's attributes match the test data
    expect(admin.username).toBe(adminData.username);
    expect(admin.email).toBe(adminData.email);
    expect(admin.password).toBe(adminData.password);
  });
});
